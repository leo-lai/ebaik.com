import axios from 'axios'
import { storage, utils } from '@/assets/js/utils'
import { Message } from 'element-ui'
import md5 from 'js-md5'
import router from '../router/index'

let baseURL = '/api'
// 创建axios实例
const service = axios.create({
  baseURL,
  timeout: 60000
})
// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  return config
}, error => Promise.reject(error))
// respone拦截器
service.interceptors.response.use(response => {
  const data = response.data
  if(data.resultCode === 200) {
    data.code = data.resultCode
    return data
  } else {
    let error = new Error(data.message || '服务器接口出错')
    error.code = data.resultCode
    return Promise.reject(error)
  }
}, error => {
  if(error.response) {
    error.code = error.response.status
    switch(error.code) {
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

// 封装一下
const fetch = {
  source: {}, // 记录请求，用于取消
  ajax(url = '', data = {}, method = 'GET') {
    let source = axios.CancelToken.source()
    fetch.source[url] = source
    data.token = storage.local.get('token') || null
    data.userId =(storage.local.get('userInfo') || {}).userId
    data.timestamp = Date.now()
    data.sign = md5(utils.sign(data))
    return new Promise((resolve, reject) => {
      let ajaxParams = {
        url, method, headers: {}
      }
      switch(method) {
        case 'POST':
          ajaxParams.headers['Content-Type'] = 'application/x-www-form-urlencoded'
          ajaxParams.data = data
          ajaxParams.transformRequest = [function(data) {
            let ret = []
            for(let key in data) {
              if(data[key] != null && data[key] !== undefined) {
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
        if(axios.isCancel(error)) {
          error.code = -1
          error.abort = true
        } else {
          error.abort = false
          if(error.code === 4002) { // 登录失效
            Message({
              type: 'error',
              message: '未登录或登录失效，请重新登录',
              onClose() {
                api.auth.logout().then(() => {
                  router.push('/login?to=' + location.href)
                })
              }
            })
          } else { // 接口出错
            Message({
              type: 'error',
              message: error.message
            })
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
  md5,
  baseURL,
  uploadURL: baseURL + '/publics_v2/upload',
  pageSizes: [10, 20, 50, 100, 200, 500],
  abort(url = '') { // 取消接口请求
    if(url) {
      fetch.source[url] && fetch.source[url].cancel('取消请求')
    }else {
      let urls = Object.keys(fetch.source)
      urls.forEach(url => {
        fetch.source[url] && fetch.source[url].cancel('取消请求')
      })
    }
  },
  // 发送手机验证码
  sendMobiCode(phone, btn) {
    // if(!/^1\d{10}$/.test(phone)) {
    //   Message.error('请输入正确手机号码')
    //   return Promise.reject('请输入正确手机号码')
    // }

    if(btn && btn.nodeType) {
      if(btn.time >= 0) {
        return Promise.resolve()
      }

      btn.time = 60
      btn.timeId = 0
      btn.oldText = btn.textContent
      btn.setAttribute('disabled', true)
      btn.textContent = '60s'
      btn.timeId = setInterval(() => {
        if(--btn.time >= 0) {
          btn.textContent = `${btn.time}s`
        } else {
          clearInterval(btn.timeId)
          btn.removeAttribute('disabled')
          btn.textContent = btn.oldText
        }
      }, 1000)
    }

    let promise = fetch.post('/publics_v2/sendCode', { account: phone })
    promise.catch(() => {
      if(btn) {
        clearInterval(btn.timeId)
        btn.removeAttribute('disabled')
        btn.textContent = btn.oldText
      }
    })
    return promise
  },
  getQiniuToken() {
    let qiniuToken = storage.local.get('qiniu_token')
    if(qiniuToken) {
      return Promise.resolve(qiniuToken)
    }else{
      return fetch.get('/publics_v2/getToken').then(({data}) => {
        storage.local.set('qiniu_token', data, 1000 * 60 * 30)
        return data
      })
    }
  },
  uploadBase64(base64Data = '') {
    return fetch.post('/uploadImageBase64', {
      img_file: base64Data
    })
  },
  uploadByBase64(base64Data = '') {
    var formData = new FormData()
    // convertBase64UrlToBlob函数是将base64编码转换为Blob
    formData.append('img_file', utils.convert.base64ToBlob(base64Data), 'image_' + Date.now() + '.png')
    return fetch.form('/uploadImage', formData)
  },
  auth: {
    checkLogin() {
      return Promise.resolve(!!storage.local.get('token'))
    },
    getLocalUserInfo() { // 获取用户信息(本地)
      return Promise.resolve(storage.local.get('userInfo'))
    },
    setLocalUserInfo(userInfo = {}) { // 更新用户信息(本地)
      return Promise.resolve(storage.local.set('userInfo', userInfo))
    },
    logout() {
      storage.local.remove('token')
      storage.local.remove('userInfo')
      return Promise.resolve()
    },
  }
}

const platformAPI = {
  admin: { // 后台接口
    auth: {
      findPwd(formData = {}) {
        formData.password = md5(formData.password)
        formData.repassword = md5(formData.repassword)
        return fetch.post('/work_v2/findpwd', formData)
      },
      changePwd(formData = {}) {
        formData.oldpassword = md5(formData.oldpassword)
        formData.password = md5(formData.password)
        formData.repassword = md5(formData.repassword)
        return fetch.post('/work_v2/updatepwd', formData)
      },
      login(formData = {}) {
        formData.password = md5(formData.password)
        // return fetch.post('/work_v2/login', formData)
        return Promise.resolve({
          data: {
            name: 'leolai',
            token: 'token_string_xxxxxxxxxxxxxxx',
            userId: 'xxxxxxxxxxxxxxxx'
          },
          resultCode: 200,
          message: '登录成功'
        })
      }
    },
    order: {
      getList(formData = {}, page = 1, rows = 20) {
        formData.page = page
        formData.rows = rows
        return fetch.get('/work_v2/order/index', formData)
      }
    }
  }
}

const api = utils.mergeObj({}, commonAPI, platformAPI[router.platform])
export default api
