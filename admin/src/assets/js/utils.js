/* ES 增强 ************************************************************/
if (!Promise.prototype.finally) {
  Object.defineProperty(Promise.prototype, 'finally', {
    value: function (callback) {
      let P = this.constructor
      return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => { throw reason })
      )
    }
  })
}
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function (searchElement, fromIndex) {

      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('[this] is null or not defined')
      }

      var o = Object(this)

      // 2. Let len be ? ToLength(? Get(O, 'length')).
      var len = o.length >>> 0

      // 3. If len is 0, return false.
      if (len === 0) {
        return false
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0)

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        // c. Increase k by 1.
        // NOTE: === provides the correct 'SameValueZero' comparison needed here.
        if (o[k] === searchElement) {
          return true
        }
        k++
      }

      // 8. Return false
      return false
    }
  });
}
if (!Array.prototype.insert) {
  Object.defineProperty(Array.prototype, 'insert', {
    value: function (index, insertElement) {

      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('[this] is null or not defined')
      }

      this.splice(index, 0, insertElement)
    }
  })
}

// 货币格式 100000.11 -> 100,000.11
if (!Number.prototype.currency){
  Number.prototype.currency = function (places, symbol = '', thousand = ',', decimal = '.') {
    places = !isNaN(places = Math.abs(places)) ? places : 2
    var number = this,
      negative = number < 0 ? '-' : '',
      i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + '',
      j = (j = i.length) > 3 ? j % 3 : 0
    return symbol + negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : '')
  }
}

export function formatNumber(num, cent, isThousand) {
  num = num.toString().replace(/\$|\,/g,'')

  // 检查传入数值为数值类型
  if(isNaN(num)) num = '0'

  // 获取符号(正/负数)
  let sign = (num == (num = Math.abs(num)))
  // 把指定的小数位先转换成整数.多余的小数位四舍五入
  num = Math.floor(num*Math.pow(10,cent)+0.50000000001)  
  // 求出小数位数值
  let cents = num%Math.pow(10,cent)
  // 求出整数位数值
  num = Math.floor(num/Math.pow(10,cent)).toString()
  // 把小数位转换成字符串,以便求小数位长度
  cents = cents.toString()

  // 补足小数位到指定的位数
  while(cents.length<cent) cents = '0' + cents

  if(isThousand) {
      // 对整数部分进行千分位格式化.
      for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
          num = num.substring(0,num.length-(4*i+3))+','+ num.substring(num.length-(4*i+3))
  }

  if (cent > 0)
      return (((sign)?'':'-') + num + '.' + cents)
  else
      return (((sign)?'':'-') + num)
}
/** 
 *  对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
    可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
    Date()).pattern('yyyy-MM-dd hh:mm:ss.S')==> 2006-07-02 08:09:04.423      
 * (new Date()).pattern('yyyy-MM-dd E HH:mm:ss') ==> 2009-03-10 二 20:09:04      
 * (new Date()).pattern('yyyy-MM-dd EE hh:mm:ss') ==> 2009-03-10 周二 08:09:04      
 * (new Date()).pattern('yyyy-MM-dd EEE hh:mm:ss') ==> 2009-03-10 星期二 08:09:04      
 * (new Date()).pattern('yyyy-M-d h:m:s.S') ==> 2006-7-2 8:9:4.18      
 */
if (!Date.prototype.format) {
  Date.prototype.format = function (fmt = 'yyyy-MM-dd HH:mm') {
    var o = {
      'M+': this.getMonth() + 1, //月份         
      'd+': this.getDate(), //日         
      'h+': this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时         
      'H+': this.getHours(), //小时         
      'm+': this.getMinutes(), //分         
      's+': this.getSeconds(), //秒         
      'q+': Math.floor((this.getMonth() + 3) / 3), //季度         
      'S': this.getMilliseconds() //毫秒         
    }
    var week = {
      '0': '/u65e5',
      '1': '/u4e00',
      '2': '/u4e8c',
      '3': '/u4e09',
      '4': '/u56db',
      '5': '/u4e94',
      '6': '/u516d'
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    if (/(E+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[this.getDay() + ''])
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  }
}
/* ES 增强 end *********************************************/

// 设备监测
const ua = navigator.userAgent
const isAndroid = /(Android);?[\s\/]+([\d.]+)?/.test(ua)
const isIpad = /(iPad).*OS\s([\d_]+)/.test(ua)
const isIpod = /(iPod)(.*OS\s([\d_]+))?/.test(ua)
const isIphone = !isIpad && /(iPhone\sOS)\s([\d_]+)/.test(ua)
const isWechat = /micromessenger/i.test(ua)
const isPC = !(isAndroid || isIpad || isIpod || isIphone)
const isIos = isIphone || isIpad || isIpod
export let device = {
  isAndroid, isIos, isPC, isWechat
}

// 本地存储
let store_prefix = ''
export let storage = {
  setPrefix: (prefix = '') => store_prefix = prefix + '_',
  cookies: {
    get(sKey) {
      if (!sKey) return null
      sKey = store_prefix + sKey
      return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null
    },
    set(sKey, sValue, vEnd = 1800, sPath = '/', sDomain = '', bSecure = false) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) return false

      sKey = store_prefix + sKey
      let sExpires = ''
      if (vEnd) {
        switch (vEnd.constructor) {
          case Number: // 单位秒
            sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd
            break
          case String:
            sExpires = '; expires=' + vEnd
            break
          case Date:
            sExpires = '; expires=' + vEnd.toUTCString()
            break
        }
      }
      document.cookie = encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue) + sExpires + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '') + (bSecure ? '; secure' : '')
      return true
    },
    remove(sKey, sPath = '/', sDomain = '') {
      if (!this.has(sKey)) return false

      sKey = store_prefix + sKey
      document.cookie = encodeURIComponent(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '')
      return true
    },
    has(sKey) {
      if (!sKey) return false
      return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie)
    },
    keys() {
      let aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/)
      for (let nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]) }
      return aKeys
    }
  },
  session: {
    set(key, value = '') {
      if (!key) return false
      window.sessionStorage.setItem(store_prefix + key, JSON.stringify(value))
    },
    get(key) {
      if (!key) return ''
      return JSON.parse(window.sessionStorage.getItem(store_prefix + key)) || ''
    },
    remove(key) {
      if (!key) return false
      return window.sessionStorage.removeItem(store_prefix + key)
    }
  },
  local: {
    set(key, value = '', ms = 1000 * 3600 * 24 * 365) {
      if (!key) return false
      key = store_prefix + key
      let newValue = {
        value: value,
        expires: ms,
        time: new Date().getTime()
      }
      window.localStorage.setItem(key, JSON.stringify(newValue))
    },
    get(key) {
      if (!key) return ''
      key = store_prefix + key

      let value = JSON.parse(window.localStorage.getItem(key))
      if (value && (new Date().getTime() - value.time < value.expires)) {
        value = value.value
      } else {
        value = ''
      }
      return value
    },
    remove(key) {
      if (!key) return false
      return window.localStorage.removeItem(store_prefix + key)
    }
  }
}
// 顶部提示
export let toptip = (text = '', ms = 3000) => {
  if(!text) return
  let elem = document.querySelector('#l-toptip')
  if(!elem){
    elem = document.createElement('div')
    elem.id = 'l-toptip'
    elem.className = 'l-toptip'
    document.body.appendChild(elem)
  }
  
  clearTimeout(toptip.timeId)
  elem.innerHTML = text
  elem.classList.add('_show')
  toptip.timeId = setTimeout(function(){
    elem.classList.remove('_show')
  }, ms)
}

export let str2date = (dateStr = '') => {
  return dateStr ? new Date(Date.parse(dateStr.replace(/-/gi, '/'))) : new Date()
}
// 获取微信授权路径
export let getGrantUrl = (url = '', params = {}, scope = 'snsapi_base') => {
  url = utils.url.setArgs(url, Object.assign({}, params, { code: undefined }))

  if (!/^http(s?)/i.test(url)) { // 如果路径没带域名，加上
    url = window.location.origin + url
  }

  // 转码路径中的特殊字符 如：/ 转换成 %2F
  url = url.replace(/[\?&=#,]/ig, ($1) => encodeURIComponent($1))

  let appid = 'wxd13f45a284fbb228'
  // return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${url}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`
  return `/getCode.html?appid=${appid}&redirect_uri=${url}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`
}

export let guid = function () {
  var d = new Date().getTime()
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid
}

export let throttle = function(func, wait, options) {
  /* options的默认值
   *  表示首次调用返回值方法时，会马上调用func；否则仅会记录当前时刻，当第二次调用的时间间隔超过wait时，才调用func。
   *  options.leading = true;
   * 表示当调用方法时，未到达wait指定的时间间隔，则启动计时器延迟调用func函数，若后续在既未达到wait指定的时间间隔和func函数又未被调用的情况下调用返回值方法，则被调用请求将被丢弃。
   *  options.trailing = true; 
   * 注意：当options.trailing = false时，效果与上面的简单实现效果相同
   */
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    // 计算剩余时间
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    // 当到达wait指定的时间间隔，则调用func函数
    // 精彩之处：按理来说remaining <= 0已经足够证明已经到达wait的时间间隔，但这里还考虑到假如客户端修改了系统时间则马上执行func函数。
    if (remaining <= 0 || remaining > wait) {
      // 由于setTimeout存在最小时间精度问题，因此会存在到达wait的时间间隔，但之前设置的setTimeout操作还没被执行，因此为保险起见，这里先清理setTimeout操作
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      // options.trailing=true时，延时执行func函数
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

export let isSupportSticky = function () {//判断是否支持sticky
  var prefixTestList = ['', '-webkit-'];
  var stickyText = '';
  for (var i = 0; i < prefixTestList.length; i++ ) {
    stickyText += 'position:' + prefixTestList[i] + 'sticky;';
  }
  // 创建一个dom来检查
  var div = document.createElement('div');
  div.style.cssText = stickyText;
  document.body.appendChild(div);
  var isSupport = /sticky/i.test(window.getComputedStyle(div).position);
  document.body.removeChild(div);
  div = null;
  return isSupport;
}

export let class2type = (function () {
  let ret = {}
  'Boolean Number String Function Array Date RegExp Object Error'.split(' ').forEach((name) => {
    ret['[object ' + name + ']'] = name.toLowerCase()
  })
  return ret
})()

export let utils = {
  formatNumber,
  isSupportSticky,
  throttle,
  guid, 
  str2date,
  device, 
  noop() { },
  extend(target, ...objs) {
    if (!utils.isPlainObject(target)) return null
    objs.forEach((obj) => {
      if (utils.isPlainObject(obj)) {
        Object.keys(obj).forEach(key => {
          if (obj[key] !== undefined) {
            target[key] = obj[key]
          }
        })
      }
    })
    return target
  },
  getObjVal(object, path) {
    var props = path.split('.')
    for(var i=0; i<props.length; i++){
      var p = props[i]
      if(object && object.hasOwnProperty(p)){
        object = object[p]
      }else{
        return undefined
      }
    }
    return object
  },
  /* 
    比较字符串
    strcpr('admin, shop', 'admin, nologin') -> true
  */
  strcpr(strchild, strparent) {
    if(strchild === strparent) return true
    if(this.isString(strchild) && this.isString(strparent)) {
      strchild = strchild.split(',')
      strparent = strparent.split(',')

      let result = false
      for(let i = 0; i < strchild.length; i++) {
        if(strparent.includes(strchild[i])) {
          result = true
          break
        }
      }
      return result
    }else {
      return false
    }
  },
  /* 
    target存在的属性才会赋值
    copyObj({name: 123}, {name: 456}, {sex: 1}) => {name: 456}
  */
  copyObj(target, ...objs) { 
    if (!utils.isPlainObject(target)) return null
    objs.forEach((obj) => {
      if (utils.isPlainObject(obj)) {
        Object.keys(target).forEach(key => {
          if (obj[key] !== null && obj[key] !== undefined) {
            target[key] = obj[key]
          }
        })
      } else {
        Object.keys(target).forEach(key => {
          target[key] = obj
        })
      }
    })
    return target
  },
  /* 
    深合并对象(仅合并对象，其他数据类型覆盖，如函数、数组等)
    mergeObj(
      {
        name: 123, 
        info: { sex: 1}
      }, 
      {
        name:456, 
        avatar: 'http',
        info: { age: 18 }
      }
    ) => { name: 456, avatar: 'http', info: { sex: 1, age: 18 } }
  */
  mergeObj(target, ...objs) {
    let _merge = function(_target, _source) {
      if(utils.isPlainObject(_target) && utils.isPlainObject(_source)) {
        Object.keys(_source).forEach(key => {
          if(utils.isPlainObject(_target[key]) && utils.isPlainObject(_source[key])) {
            _merge(_target[key], _source[key])
          }else{
            _target[key] = _source[key]
          }
        })
      }
      return _target
    }

    objs.forEach((obj) => {
      if(utils.isPlainObject(obj)) {
        _merge(target, obj)
      }
    })
    return target
  },
  type(value) {
    //如果是null或者undefined，直接转成String返回
    if (value == null) return String(value)
    //RegExp，Array等都属于Object
    //为了精准判断类型，借由Object.prototype.toString跟class2type表
    //这里为什么要用core_toString而不用obj.toString的原因在刚刚试验中说明了
    return typeof value === 'object' || typeof value === 'function' ?
      class2type[class2type.toString.call(value)] || 'object' : typeof value
  },
  isPlainObject(obj) {
    // Must be an Object.
    // Because of IE, we also have to check the presence of the constructor property.
    // Make sure that DOM nodes and window objects don't pass through, as well
    if (!obj || utils.type(obj) !== 'object' || obj.nodeType || utils.isWindow(obj)) {
      return false;
    }
    try {
      // Not own constructor property must be Object
      if (obj.constructor &&
        !class2type.hasOwnProperty.call(obj, 'constructor') &&
        !class2type.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
        return false;
      }
    } catch (e) {
      // IE8,9 Will throw exceptions on certain host objects #9897
      return false;
    }
    // Own properties are enumerated firstly, so to speed up,
    // if last one is own, then all properties are own.
    let key = undefined
    for (key in obj) { /* console.log(key) */ }
    return key === undefined || class2type.hasOwnProperty.call(obj, key);
  },
  isEmptyObject(obj) {
    for (let key in obj) {
      return false
    }
    return true
  },
  isFunction(obj) {
    return utils.type(obj) === 'function'
  },
  isArray: Array.isArray || function (obj) {
    return utils.type(obj) === 'array'
  },
  isWindow(obj) {
    return obj != null && obj == obj.window
  },
  isString(value) {
    return typeof value === 'string'
  },
  isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value)
  },
  setTitle(title) {
    document.title = title || '微信浏览器'
    // 判断是否为ios设备的微信浏览器，加载iframe来刷新title
    if (device.isWechat && device.isIphone) {
      let iframe = document.createElement('iframe')

      iframe.setAttribute('style', 'position:absolute;visibility:hidden;height:0;width:0;');
      iframe.addEventListener('load', function load() {
        iframe.removeEventListener('load', load)
        document.body.removeChild(iframe)
      })

      setTimeout(() => {
        iframe.setAttribute('src', '//m.baidu.com/favicon.ico')
        document.body.appendChild(iframe)
      }, 650)
    }
  },
  history: {
    push(url, title, data) {
      this.assign(url, title, data)
    },
    replace(url, title, data) {
      this.assign(url, title, data, 'replace')
    },
    assign(url = '', title = '', data = {}, action = 'push') {
      window.history[action + 'State'](data, title, url)
    }
  },
  url: {
    parse(url) {
      if (typeof url !== 'string') url = window.location.href
      let a = document.createElement('a')
      a.href = url
      return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function () {
          let ret = {}
          let seg = a.search.replace(/^\?/, '').split('&')
          let len = seg.length
          let i = 0, s = null
          for (; i < len; i++) {
            if (!seg[i]) { continue; }
            s = seg[i].split('=');
            ret[s[0]] = s[1];
          }
          return ret
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || ['', ''])[1],
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || ['', ''])[1],
        segments: a.pathname.replace(/^\//, '').split('/')
      }
    },
    getArgs(url) {
      if (typeof url !== 'string') url = window.location.href
      url = decodeURIComponent(url)
      let pos = url.indexOf('?'),
        pos2 = url.lastIndexOf('#'),
        qs = pos > -1 ? url.substring(pos + 1, pos2 <= pos ? url.length : pos2) : '',
        items = qs.split('&')
      let args = {},
        name = null,
        value = null
      for (let i = 0, splitPos = 0, item = null; i < items.length; i++) {
        item = items[i]
        splitPos = item.indexOf('=')
        name = item.substring(0, splitPos)
        value = item.substring(splitPos + 1)
        name && (args[name] = value)
      }

      if (pos2 !== -1) {
        args['_hash'] = url.substring(pos2 + 1, url.length)
      }

      return args
    },
    setArgs(url, name, value) {
      if (typeof url !== 'string') return ''
      if (name === undefined) return url

      let urlArgs = utils.url.getArgs(url),
        params = []

      if (utils.isPlainObject(name)) {
        Object.assign(urlArgs, name)
      } else if (utils.isString(name)) {
        urlArgs[name] = value
      }

      let hash = ''
      for (let key of Object.keys(urlArgs)) {
        let val = urlArgs[key]
        if (val != undefined) {
          if (key === '_hash') {
            hash = val
          } else {
            params.push(encodeURIComponent(key) + '=' + encodeURIComponent(val))
          }
        }
      }

      params.length > 0 && (url = url.split('?')[0] + '?' + params.join('&'))
      hash && (url += '#' + hash)

      return url
    },
    reload() {
      window.location.replace(this.setArgs(window.location.href, 't', Date.now()))
    },
    /* 
      url.join('/url1', '//url2', 'url3/url4', 'url5//url6/url7//url8/', 'url9/', 'url10', null)
      => url1/url2/url3/url4/url5/url6/url7/url8/url9/url10 
    */
    join(...paths) {
      let passPath = []
      paths.filter(url => utils.isString(url)).map(url => {
        url = url.replace(/(https:\/|http:\/)?\/+/g, '$1/').replace(/^\/+|\/+$/g, '')
        if (url) {
          passPath.push(url)
        }
      })
      return passPath.join('/')
    }
  },
  imgThumb(src = '', width, height) {
    width = width || 320
    if (!src) {
      // return `https://placeholdit.imgix.net/~text?txtsize=20&bg=ffffff&txtclr=999&txt=image&w=${width}&h=${width}` 
      return ''
    }
    // return src += '?imageMogr2/gravity/Center/crop/'+width+'x'+height;
    src += `?imageMogr2/format/jpg/interlace/1/quality/60/gravity/Center/thumbnail/${width}x`
    if (height) {
      src += `/crop/x${height}`
    }
    return src
  },
  videoThumb(src = '', width, height) {
    width = width || 320
    height = height || 320
    if (!src) {
      // return `https://placeholdit.imgix.net/~text?txtsize=20&bg=ffffff&txtclr=999&txt=image&w=${width}&h=${width}` 
      return ''
    }
    // return src += '?imageMogr2/gravity/Center/crop/'+width+'x'+height;
    src += `?vframe/jpg/offset/1/w/${width}/h/${height}`
    return src
  },
  wxHead(src, size = 132) {
    if (!src) {
      return `https://placeholdit.imgix.net/~text?txtsize=16&bg=999&txtclr=fff&txt=%E5%9B%BE%E7%89%87%E7%BC%BA%E5%A4%B1&w=${size}&h=${size}`
    }
    if (src.indexOf('wx.qlogo.cn') === -1) {
      return src
    }
    // 有0、46、64、96、132数值可选，0代表640*640正方形头像
    return src.replace(/\/0$/, '/' + size)
  },
  imgToBase64(url = '', callback, outputFormat) {
    var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d'),
      img = new Image
    img.crossOrigin = ''
    img.onload = function () {
      canvas.height = img.height
      canvas.width = img.width
      ctx.drawImage(img, 0, 0)
      var dataURL = canvas.toDataURL(outputFormat || 'image/png')
      callback.call(this, dataURL)
      canvas = null;
    }
    img.src = url
  },
  base64ToBlob(base64Data) {
    //去掉url的头，并转换为byte  
    var bytes = window.atob(base64Data.split(',')[1])
    //处理异常,将ascii码小于0的转换为大于0  
    var ab = new ArrayBuffer(bytes.length)
    var ia = new Uint8Array(ab)
    for (var i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i)
    }
    return new Blob([ab], { type: 'image/png' })
  },
  // 对象属性名排序
  ksort (inputArr, sortFlags) {
    //  discuss at: http://phpjs.org/functions/ksort/
    // original by: GeekFG (http://geekfg.blogspot.com)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Brett Zamir (http://brett-zamir.me)
    //        note: The examples are correct, this is a new way
    //        note: This function deviates from PHP in returning a copy of the array instead
    //        note: of acting by reference and returning true; this was necessary because
    //        note: IE does not allow deleting and re-adding of properties without caching
    //        note: of property position; you can set the ini of 'phpjs.strictForIn' to true to
    //        note: get the PHP behavior, but use this only if you are in an environment
    //        note: such as Firefox extensions where for-in iteration order is fixed and true
    //        note: property deletion is supported. Note that we intend to implement the PHP
    //        note: behavior by default if IE ever does allow it; only gives shallow copy since
    //        note: is by reference in PHP anyways
    //        note: Since JS objects' keys are always strings, and (the
    //        note: default) SORT_REGULAR flag distinguishes by key type,
    //        note: if the content is a numeric string, we treat the
    //        note: 'original type' as numeric.
    //  depends on: i18n_loc_get_default
    //  depends on: strnatcmp
    //   example 1: data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
    //   example 1: data = ksort(data);
    //   example 1: $result = data
    //   returns 1: {a: 'orange', b: 'banana', c: 'apple', d: 'lemon'}
    //   example 2: ini_set('phpjs.strictForIn', true);
    //   example 2: data = {2: 'van', 3: 'Zonneveld', 1: 'Kevin'};
    //   example 2: ksort(data);
    //   example 2: $result = data
    //   returns 2: {1: 'Kevin', 2: 'van', 3: 'Zonneveld'}

    let tmpArr = {}
    let keys = []
    let sorter
    let i
    let k
    let that = this
    let strictForIn = false
    let populateArr = {}

    switch (sortFlags) {
      case 'SORT_STRING':
      // compare items as strings
        sorter = function (a, b) {
          return that.strnatcmp(a, b)
        }
        break
      case 'SORT_LOCALE_STRING':
      // compare items as strings, original by the current locale (set with  i18n_loc_set_default() as of PHP6)
        var loc = this.i18n_loc_get_default()
        sorter = this.php_js.i18nLocales[loc].sorting
        break
      case 'SORT_NUMERIC':
      // compare items numerically
        sorter = function (a, b) {
          return ((a + 0) - (b + 0))
        }
        break
      // case 'SORT_REGULAR': // compare items normally (don't change types)
      default:
        sorter = function (a, b) {
          let aFloat = parseFloat(a)
          let bFloat = parseFloat(b)
          let aNumeric = aFloat + '' === a
          let bNumeric = bFloat + '' === b
          if (aNumeric && bNumeric) {
            return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0
          } else if (aNumeric && !bNumeric) {
            return 1
          } else if (!aNumeric && bNumeric) {
            return -1
          }
          return a > b ? 1 : a < b ? -1 : 0
        }
        break
    }

    // Make a list of key names
    for (k in inputArr) {
      if (inputArr.hasOwnProperty(k)) {
        keys.push(k)
      }
    }
    keys.sort(sorter)

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {}
    this.php_js.ini = this.php_js.ini || {}
    // END REDUNDANT
    strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js
      .ini['phpjs.strictForIn'].local_value !== 'off'
    populateArr = strictForIn ? inputArr : populateArr

    // Rebuild array with sorted key names
    for (i = 0; i < keys.length; i++) {
      k = keys[i]
      tmpArr[k] = inputArr[k]
      if (strictForIn) {
        delete inputArr[k]
      }
    }
    for (i in tmpArr) {
      if (tmpArr.hasOwnProperty(i)) {
        populateArr[i] = tmpArr[i]
      }
    }

    return strictForIn || populateArr
  },
  // 接口签名
  sign (obj = {}) {
    let localKey = 'DFHGKZLSE2NFDEHGFHHR4XTGBKHY67EJZ8IK9'
    let newObj = this.ksort(obj)
    let ret = []
    Object.keys(newObj).forEach(name => {
      ret.push(name + '=' + newObj[name])
    })
    return ret.join('&') + localKey
  },
  fileToBlob(file) {
    return new Promise((resolve, reject) => {
      if(!file || !file.type) {
        return reject(new Error('文件不存在'))
      }
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function(e) {
        let dataURL = e.target.result
        let arr = dataURL.split(','), mime = arr[0].match(/:(.*?);/)[1]
        let bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
        while(n--){
          u8arr[n] = bstr.charCodeAt(n)
        }
        resolve(new Blob([u8arr], {type: mime}))
      }
    })
  },
  urlToBlob(dataURL) {
    return new Promise((resolve, reject) => {
      if(!dataURL) {
        return reject(new Error('文件不存在'))
      }
      
      let arr = dataURL.split(','), mime = arr[0].match(/:(.*?);/)[1]
      let bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
      while(n--){
        u8arr[n] = bstr.charCodeAt(n)
      }
      resolve(new Blob([u8arr], {type: mime}))
    })
  }
}