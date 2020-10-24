import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import { storage, utils, device } from '@/assets/utils'
import config from '@/config'

let platform = utils.platform
let baseURL = 'http://www.yingliyun.com/v999'
// 创建axios实例
const service = axios.create({
  baseURL,
  timeout: 60000,
});
// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  return config
}, error => Promise.reject(error))
// respone拦截器
service.interceptors.response.use(response => {
  const data = response.data
  if (data.code === 0) {
    return data
  } else {
    let error = new Error(data.message || '服务器接口出错')
    error.code = data.resultCode
    return Promise.reject(error)
  }
}, error => {
  if (error.response) {
    error.code = error.response.status
    switch (error.code) {
      case 400:
        error.message = '请求错误'
        break
      case 401:
        error.message = '未授权，请登录'
        break
      case 403:
        error.message = '拒绝访问'
        break
      case 404:
        error.message = `请求地址出错: ${error.response.config.url}`
        break
      case 408:
        error.message = '请求超时，请检查网络'
        break
      case 500:
        error.message = '服务器内部错误'
        break
      case 501:
        error.message = '服务未实现'
        break
      case 502:
        error.message = '网关错误'
        break
      case 503:
        error.message = '服务不可用'
        break
      case 504:
        error.message = '网关超时'
        break
      case 505:
        error.message = 'HTTP版本不受支持'
        break
      default:
        error.message = '服务器连接失败'
    }
  } else {
    error.code = 0
    error.message = '未知错误'
  }
  return Promise.reject(error)
})

// 获取微信授权路径
export let getGrantUrl = (url = '', params = {}, scope = 'snsapi_base') => {
  url = utils.url.setArgs(url, Object.assign({}, params, { code: undefined }))

  if (!/^http(s?)/i.test(url)) { // 如果路径没带域名，加上
    url = location.origin + url
  }
  // 转码路径中的特殊字符 如：/ 转换成 %2F
  url = url.replace(/[\?&=#,]/ig, $1 => encodeURIComponent($1))
  // return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${url}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`
  return `http://h5.xfnqc.com/getCode.html?appid=${config.appid}&redirect_uri=${url}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`
}

const showToast = (text = '', type = 'success') => {
  return new Promise((resolve, reject) => {
    if (type) {
      Vue.$vux.toast.show({
        type,
        text,
        time: 3000,
        isShowMask: true,
        position: 'middle',
        onHide: resolve
      })
    } else {
      Vue.$vux.toast.text(text, 'top')
    }
  })
}
const showMessage = content => {
  Vue.$vux.alert.show({
    title: '系统提示',
    content
  })
}
const showLoading = text => Vue.$vux.loading.show({ text })
const hideLoading = _ => Vue.$vux.loading.hide()

export const fetch = {
  baseURL,
  source: {},
  abort(url = '') { // 取消接口请求
    if (url) {
      fetch.source[url] && fetch.source[url]('取消请求')
    } else {
      let urls = Object.keys(fetch.source)
      urls.forEach(url => {
        fetch.source[url] && fetch.source[url]('取消请求')
      })
    }
  },
  ajax(url = '', data = {}, method = 'GET') {
    // let token = storage.local.get('token')
    // let userInfo = storage.local.get('userInfo') || {}
    data = Object.assign({}, data)

    // token && (data.token = token)
    // userInfo.userId && (data.userId = userInfo.userId)
    // data.timestamp = Date.now()
    // data.sign = md5(utils.sign(data))

    return new Promise((resolve, reject) => {
      let ajaxParams = {
        cancelToken: new axios.CancelToken(function executor(cancel) {
          // An executor function receives a cancel function as a parameter
          fetch.source[url] = cancel
        }),
        url, method, headers: {}
      }
      switch (method) {
        case 'POST':
          ajaxParams.headers['Content-Type'] = 'application/x-www-form-urlencoded'
          ajaxParams.data = data
          ajaxParams.transformRequest = [function (data) {
            let ret = []
            for (let key in data) {
              if (data[key] != null && data[key] !== undefined) {
                ret.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
              }
            }
            return ret.join('&')
          }]
          break
        case 'JSON':
          ajaxParams.method = 'POST'
          ajaxParams.headers['Content-Type'] = 'application/json'
          ajaxParams.data = data
          break
        default:
          ajaxParams.params = data
          break
      }

      service(ajaxParams).then(data => {
        fetch.source[url] = null
        resolve(data)
      }).catch(error => {
        if (axios.isCancel(error)) {
          error.code = -1
          error.aborted = true
        } else {
          error.aborted = false
          if (error.code == 4002) { // 登录失效
            showToast('登录失效', 'fail').then(() => {
              api.auth.logout().then(() => {
                router.currentRoute.path !== '/login' && router.push('/login?to=' + location.href)
              })
            })
            fetch.abort() // 取消所有请求
          } else { // 接口出错
            showMessage(error.message)
          }
        }
        fetch.source[url] = null
        reject(error)
      })
    })
  },
  get(url, data) {
    return this.ajax(url, data, 'GET')
  },
  post(url, data) {
    return this.ajax(url, data, 'POST')
  },
  json(url, data) {
    return this.ajax(url, data, 'JSON')
  }
}

const commonAPI = {
  pageSizes: [10, 20, 50, 100],
  loading: {
    show: showLoading,
    hide: hideLoading
  },
  toast: showToast,
  alert: showMessage,
  // 发送手机验证码
  sendMobiCode(phone, btn, promise) {
    if (!promise && !/^1\d{10}$/.test(phone)) {
      showMessage('请输入正确手机号码')
      return Promise.reject('请输入正确手机号码')
    }

    if (btn && btn.nodeType) {
      if (btn.time >= 0) {
        return Promise.resolve()
      }

      if (!btn.reset) {
        btn.reset = function () {
          clearInterval(btn.timeId)
          btn.time = -1
          btn.removeAttribute('disabled')
          btn.textContent = btn.oldText
        }
      }

      btn.time = 60
      btn.timeId = 0
      btn.oldText = btn.textContent
      btn.setAttribute('disabled', true)
      btn.textContent = '60s'
      btn.timeId = setInterval(() => {
        if (--btn.time >= 0) {
          btn.textContent = `${btn.time}s`
        } else {
          btn.reset()
        }
      }, 1000)
    }

    promise = promise || fetch.post('/publics_v1/sendCode', { account: phone })
    promise.catch(() => {
      if (btn) {
        btn.reset()
      }
    })

    return promise
  },
  getWxConfig(url) {
    if (!window.wx) {
      return Promise.reject('页面没有引入微信JS-SDK')
    }

    if (!device.isWechat) {
      return Promise.reject('请使用微信浏览器打开')
    }

    url = url || (device.isIos ? router.landingUrl : window.location.href)
    url = url.split('#')[0]
    // 如果查询参数后面带有 / 会导致签名失败 所以要encodeURIComponent
    url = utils.url.setArgs(url, utils.url.getArgs(url))

    const that = this
    let promise = new Promise((resolve, reject) => {
      let config = {
        debug: false,
        appId: '',
        timestamp: '',
        nonceStr: '',
        signature: '',
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'scanQRCode']
      }

      if (device.isIos && window.wx._configSuccess) {
        return resolve(window.wx)
      }

      // 获取权限配置信息
      fetch.get('/publics_v1/wxconfig', { url }).then(({ content }) => {
        config.appId = content.appId
        config.timestamp = content.timestamp
        config.nonceStr = content.noncestr
        config.signature = content.signature

        // 监听权限验证回调
        window.wx._configError = false
        window.wx.error(res => {
          console.log('error函数回调:', res)
          if (res.errMsg.indexOf('config:fail') !== -1 || res.errMsg.indexOf('invalid signature') !== -1) {
            clearTimeout(window.wx.timeid)
            window.wx._configError = true
            if (window.wx._tryConfig) {
              window.wx._configSuccess = false
              reject(res)
              console.log('再次尝试权限验证失败')
            } else {
              // ios环境下(landing page)第一次权限验证失败，再利用当前地址(current page)尝试一下
              window.wx._tryConfig = true
              resolve(that.getWxConfig(window.location.href))
              console.log(`landing page【${url}】：权限验证失败，再次尝试使用current page去验证`)
            }
          }
        })
        window.wx.ready(res => {
          console.log('ready函数回调:', res, window.wx._configError, window.wx.timeid)
          // 根据微信开发者工具调试出：wx.config end（内部事件）
          // 如果config:ok则执行 wx.ready回调，如果config:fail则执行wx.error和wx.ready
          // PS：实验证明，ready回调执行了不代表验证成功
          // 所以使用延迟函数，先看看有没有回调error函数，如果没有，则证明权限验证成功
          clearTimeout(window.wx.timeid)
          window.wx.timeid = setTimeout(() => {
            if (!window.wx._configError) {
              window.wx._configSuccess = true
              window.wx._tryConfig = false
              resolve(window.wx)
              console.log(`当前地址【${url}】JS-SDK验证成功`)
            }
          }, 200)
        })

        // wx.config begin
        window.wx.config(config)
      }).catch(reject)
    })
    return promise
  },
  getWxPayConfig(formData = {}) { // 微信支付配置
    if (!formData.orderId) {
      showMessage('订单id不存在')
      return Promise.reject('订单id不存在')
    }

    let promise = new Promise((resolve, reject) => {
      fetch.post('/interfaceShop/advanceOrder/orgAdvanceOrderInpay', formData).then(({ data }) => {
        resolve(data.payinfo || data.payInfo)
      }).catch(reject)
    })

    return promise
  },
  chooseWXPay(formData) { // 微信jssdk支付
    let promise = new Promise((resolve, reject) => {
      if (!device.isWechat) {
        showToast('请使用微信浏览器支付', null)
        return reject('请使用微信浏览器支付')
      }

      showLoading('正在支付...')
      this.getWxConfig().then(wx => {
        this.getWxPayConfig(formData).then(data => {
          wx.chooseWXPay({
            timestamp: data.timeStamp,
            nonceStr: data.nonceStr,
            package: data.package,
            signType: data.signType,
            paySign: data.paySign,
            success: res => {
              if (res.err_msg === 'get_brand_wcpay_request:ok') {
                resolve('ok')
              } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                reject('cancel')
              } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
                reject('fail')
              } else {
                resolve('支付回调成功')
              }
            },
            fail: err => reject(err.errMsg)
          })
        }).finally(() => {
          hideLoading()
        })
      }).catch(err => {
        reject(err)
        hideLoading()
      })
    })
    return promise
  },
  chooseWXPay2(formData) { // 微信浏览器支付
    let promise = new Promise((resolve, reject) => {
      if (!device.isWechat) {
        showToast('请使用微信浏览器支付', null)
        reject('请使用微信浏览器支付')
        return
      }
      showLoading('正在支付...')
      this.getWxPayConfig(formData).then(data => {
        let onBridgeReady = function () {
          window.WeixinJSBridge.invoke('getBrandWCPayRequest', data, res => {
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
              resolve('ok')
            } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
              reject('cancel')
            } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
              reject('fail')
            } else {
              resolve('支付回调成功')
            }
          })
        }
        if (typeof WeixinJSBridge == 'undefined') {
          document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
        } else {
          onBridgeReady()
        }
      }).catch(reject).finally(() => {
        hideLoading()
      })
    })
    return promise
  },
  previewImage(imgs = [], index = 0) {
    return new Promise((resolve, reject) => {
      showLoading()
      this.getWxConfig().then(wx => {
        wx.previewImage({
          current: utils.isNumber(index) ? imgs[index] : index,   // 当前显示图片的http链接
          urls: imgs,                                             // 需要预览的图片http链接列表
          success: res => resolve(res),
          fail: err => reject(err.errMsg)
        })
      }).catch(reject).finally(() => {
        hideLoading()
      })
    })
  },
  chooseImage(count = 1) {
    return new Promise((resolve, reject) => {
      showLoading()
      this.getWxConfig().then(wx => {
        wx.chooseImage({
          count,
          sizeType: ['original', 'compressed'],     // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'],          // 可以指定来源是相册还是相机，默认二者都有
          success: res => resolve(res.localIds),    // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          fail: err => reject(err.errMsg)
        })
      }).catch(reject).finally(() => {
        hideLoading()
      })
    })
  },
  uploadImage(localIds = [], remote = true) {
    return new Promise((resolve, reject) => {
      this.getWxConfig().then(wx => {
        let _serverIds = []
        let _localIds = []
        let allLength = localIds.length
        let syncUpload = function (localIds) {
          let localId = localIds.pop()
          wx.uploadImage({
            localId,
            isShowProgressTips: 0,
            success: res => {
              _serverIds.push(res.serverId)
              _localIds.push(localId)

              if (localIds.length > 0) {
                showLoading(`上传中(${_localIds.length}/${allLength})`)
                syncUpload(localIds)
              } else {
                if (remote) {
                  fetch.post('/common/uploadImage', {
                    media_ids: _serverIds.join(',')
                  }).then(({ data }) => {
                    resolve({
                      serverIds: _serverIds,
                      localIds: _localIds,
                      images: data
                    })
                  }).finally(() => {
                    hideLoading()
                  })
                } else {
                  resolve({
                    serverIds: _serverIds,
                    localIds: _localIds,
                    images: []
                  })
                  hideLoading()
                }
              }
            },
            fail: err => {
              if (localIds.length === 0) {
                hideLoading()
                reject(err.errMsg)
              }
            }
          })
        }

        showLoading(allLength > 1 ? `上传中(1/${allLength})` : '上传中')
        syncUpload(localIds)

      }).catch(reject)
    })
  },
  wxShare(shareInfo) {
    let _default = {
      title: document.title,
      imgUrl: '',
      desc: document.title,
      link: window.location.href
    }
    return new Promise((resolve, reject) => {
      this.getWxConfig().then(wx => {
        let _info = Object.assign({}, _default, shareInfo)
        wx.onMenuShareTimeline(_info)
        wx.onMenuShareAppMessage(_info)
        wx.onMenuShareQQ(_info)
        wx.onMenuShareQZone(_info)

        resolve(wx)
      }).catch(reject)
    })
  },
  getQiniuToken() { // 获取七牛上传Token
    let qiniuToken = storage.local.get('qiniu_token')
    if (qiniuToken) {
      return Promise.resolve(qiniuToken)
    } else {
      return fetch.get('/publics_v2/getToken').then(({ data }) => {
        storage.local.set('qiniu_token', data, 1000 * 60 * 30)
        return data
      }).catch(() => {
        storage.local.remove('qiniu_token')
      })
    }
  },

  getLocalUserInfo() { // 获取用户信息(本地)
    return Promise.resolve(storage.local.get('userInfo'))
  },
  setLocalUserInfo(userInfo = {}) { // 更新用户信息(本地)
    return Promise.resolve(storage.local.set('userInfo', userInfo))
  },
  auth: {
    checkLogin() {
      return storage.local.get('token') ? Promise.resolve() : Promise.reject()
    },
    logout() {
      storage.local.remove('token')
      storage.local.remove('userInfo')
      return Promise.resolve()
    },
  },
}

const platformAPI = {

}

export const api = utils.mergeObj({}, commonAPI, platformAPI[platform])
