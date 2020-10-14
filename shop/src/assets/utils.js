/* ES 增强 ************************************************************/
if (!HTMLCanvasElement.prototype.toBlob) {
  Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
    value: function (callback, type = 'image/png', quality) {
      let binStr = atob(this.toDataURL(type, quality).split(',')[1])
      let len = binStr.length
      let arr = new Uint8Array(len)

      for (var i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i)
      }
      callback(new Blob([arr], {
        type
      }))
    }
  })
}
if (!Promise.prototype.finally) {
  Object.defineProperty(Promise.prototype, 'finally', {
    value: function (callback) {
      let P = this.constructor
      return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => {
          throw reason
        })
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
  })
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
if (!Array.prototype.remove) {
  Array.prototype.remove = function (val) {
    var index = this.indexOf(val)
    if (index > -1) {
      this.splice(index, 1)
    }
  }
}
// 货币格式 100000.11 -> 100,000.11
if (!Number.prototype.currency) {
  Number.prototype.currency = function (places, symbol = '', thousand = ',', decimal = '.') {
    places = !isNaN(places = Math.abs(places)) ? places : 2
    var number = this,
      negative = number < 0 ? '-' : '',
      i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + '',
      j = (j = i.length) > 3 ? j % 3 : 0
    return symbol + negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : '')
  }
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
const isAndroid = /(Android);?[\s/]+([\d.]+)?/.test(ua)
const isIpad = /(iPad).*OS\s([\d_]+)/.test(ua)
const isIpod = /(iPod)(.*OS\s([\d_]+))?/.test(ua)
const isIphone = !isIpad && /(iPhone\sOS)\s([\d_]+)/.test(ua)
const isWechat = /micromessenger/i.test(ua)
const isPC = !(isAndroid || isIpad || isIpod || isIphone)
const isIos = isIphone || isIpad || isIpod
export let device = {
  isAndroid,
  isIos,
  isPC,
  isWechat
}

// 本地存储
let store_prefix = ''
export let storage = {
  setPrefix: (prefix = '') => store_prefix = prefix + '_',
  cookies: {
    get(sKey) {
      if (!sKey) return null
      sKey = store_prefix + sKey
      return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null
    },
    set(sKey, sValue, vEnd = 1800, sPath = '/', sDomain = '', bSecure = false) {
      if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) return false

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
      return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&') + '\\s*\\=')).test(document.cookie)
    },
    keys() {
      let aKeys = document.cookie.replace(/((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:=[^;]*)?;\s*/)
      for (let nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
        aKeys[nIdx] = decodeURIComponent(aKeys[nIdx])
      }
      return aKeys
    },
    clear(sPath = '/', sDomain = '') {
      let keys = this.keys()
      keys.forEach(key => {
        document.cookie = encodeURIComponent(key) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '')
      })
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
  if (!text) return
  let elem = document.querySelector('#l-toptip')
  if (!elem) {
    elem = document.createElement('div')
    elem.id = 'l-toptip'
    elem.className = 'l-toptip'
    document.body.appendChild(elem)
  }

  clearTimeout(toptip.timeId)
  elem.innerHTML = text
  elem.classList.add('_show')
  toptip.timeId = setTimeout(function () {
    elem.classList.remove('_show')
  }, ms)
}

export let str2date = (dateStr = '') => {
  return dateStr ? new Date(Date.parse(dateStr.replace(/-/gi, '/'))) : new Date()
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

// 每隔多少时间执行一次
export let throttle = function (func, wait, options) {
  var context, args, result

  // setTimeout 的 handler
  var timeout = null

  // 标记时间戳
  // 上一次执行回调的时间戳
  var previous = 0

  // 如果没有传入 options 参数
  // 则将 options 参数置为空对象
  if (!options)
    options = {}

  var later = function () {
    // 如果 options.leading === false
    // 则每次触发回调后将 previous 置为 0
    // 否则置为当前时间戳
    previous = options.leading === false ? 0 : Date.now()
    timeout = null
    result = func.apply(context, args)
    // 这里的 timeout 变量一定是 null 了吧
    // 是否没有必要进行判断？
    if (!timeout)
      context = args = null
  }

  // 以滚轮事件为例（scroll）
  // 每次触发滚轮事件即执行这个返回的方法
  // Date.throttle 方法返回的函数
  return function () {
    // 记录当前时间戳
    var now = Date.now()

    // 第一次执行回调（此时 previous 为 0，之后 previous 值为上一次时间戳）
    // 并且如果程序设定第一个回调不是立即执行的（options.leading === false）
    // 则将 previous 值（表示上次执行的时间戳）设为 now 的时间戳（第一次触发时）
    // 表示刚执行过，这次就不用执行了
    if (!previous && options.leading === false)
      previous = now

    // 距离下次触发 func 还需要等待的时间
    var remaining = wait - (now - previous)
    context = this
    args = arguments

    // 要么是到了间隔时间了，随即触发方法（remaining <= 0）
    // 要么是没有传入 {leading: false}，且第一次触发回调，即立即触发
    // 此时 previous 为 0，wait - (now - previous) 也满足 <= 0
    // 之后便会把 previous 值迅速置为 now
    // ========= //
    // remaining > wait，表示客户端系统时间被调整过
    // 则马上执行 func 函数
    // @see https://blog.coding.net/blog/the-difference-between-throttle-and-debounce-in-underscorejs
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        // 解除引用，防止内存泄露
        timeout = null
      }

      // 重置前一次触发的时间戳
      previous = now

      // 触发方法
      // result 为该方法返回值
      result = func.apply(context, args)
      // 引用置为空，防止内存泄露
      // 感觉这里的 timeout 肯定是 null 啊？这个 if 判断没必要吧？
      if (!timeout)
        context = args = null
    } else if (!timeout && options.trailing !== false) { // 最后一次需要触发的情况
      // 如果已经存在一个定时器，则不会进入该 if 分支
      // 如果 {trailing: false}，即最后一次不需要触发了，也不会进入这个分支
      // 间隔 remaining milliseconds 后触发 later 方法
      timeout = setTimeout(later, remaining)
    }

    // 回调返回值
    return result
  }
}
// 超过多少时间才执行
export let debounce = function (func, wait, immediate) {
  var timeout, args, context, timestamp, result

  var later = function () {
    // 定时器设置的回调 later 方法的触发时间，和连续事件触发的最后一次时间戳的间隔
    // 如果间隔为 wait（或者刚好大于 wait），则触发事件
    var last = Date.now() - timestamp

    // 时间间隔 last 在 [0, wait) 中
    // 还没到触发的点，则继续设置定时器
    // last 值应该不会小于 0 吧？
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      // 到了可以触发的时间点
      timeout = null
      // 可以触发了
      // 并且不是设置为立即触发的
      // 因为如果是立即触发（callNow），也会进入这个回调中
      // 主要是为了将 timeout 值置为空，使之不影响下次连续事件的触发
      // 如果不是立即执行，随即执行 func 方法
      if (!immediate) {
        // 执行 func 函数
        result = func.apply(context, args)
        // 这里的 timeout 一定是 null 了吧
        // 感觉这个判断多余了
        if (!timeout)
          context = args = null
      }
    }
  }

  // 嗯，闭包返回的函数，是可以传入参数的
  // 也是 DOM 事件所触发的回调函数
  return function () {
    // 可以指定 this 指向
    context = this
    args = arguments

    // 每次触发函数，更新时间戳
    // later 方法中取 last 值时用到该变量
    // 判断距离上次触发事件是否已经过了 wait seconds 了
    // 即我们需要距离最后一次事件触发 wait seconds 后触发这个回调方法
    timestamp = Date.now()

    // 立即触发需要满足两个条件
    // immediate 参数为 true，并且 timeout 还没设置
    // immediate 参数为 true 是显而易见的
    // 如果去掉 !timeout 的条件，就会一直触发，而不是触发一次
    // 因为第一次触发后已经设置了 timeout，所以根据 timeout 是否为空可以判断是否是首次触发
    var callNow = immediate && !timeout

    // 设置 wait seconds 后触发 later 方法
    // 无论是否 callNow（如果是 callNow，也进入 later 方法，去 later 方法中判断是否执行相应回调函数）
    // 在某一段的连续触发中，只会在第一次触发时进入这个 if 分支中
    if (!timeout)
      // 设置了 timeout，所以以后不会进入这个 if 分支了
      timeout = setTimeout(later, wait)

    // 如果是立即触发
    if (callNow) {
      // func 可能是有返回值的
      result = func.apply(context, args)
      // 解除引用
      context = args = null
    }
    return result
  }
}

export let isSupportSticky = function () { //判断是否支持sticky
  var prefixTestList = ['', '-webkit-']
  var stickyText = ''
  for (var i = 0; i < prefixTestList.length; i++) {
    stickyText += 'position:' + prefixTestList[i] + 'sticky;'
  }
  // 创建一个dom来检查
  var div = document.createElement('div')
  div.style.cssText = stickyText
  document.body.appendChild(div)
  var isSupport = /sticky/i.test(window.getComputedStyle(div).position)
  document.body.removeChild(div)
  div = null
  return isSupport
}

export let class2type = (function () {
  let ret = {}
  'Boolean Number String Function Array Date RegExp Object Error'.split(' ').forEach((name) => {
    ret['[object ' + name + ']'] = name.toLowerCase()
  })
  return ret
})()

export let utils = {
  platform: "",
  isSupportSticky,
  throttle,
  debounce,
  guid,
  str2date,
  device,
  noop() {},
  extend(target, ...objs) {
    if (!utils.isPlainObject(target)) return null;
    objs.forEach((obj) => {
      if (utils.isPlainObject(obj)) {
        Object.keys(obj).forEach((key) => {
          if (obj[key] !== undefined) {
            target[key] = obj[key];
          }
        });
      }
    });
    return target;
  },
  /* 
    target存在的属性才会赋值
    copyObj({name: 123}, {name: 456}, {sex: 1}) => {name: 456}
  */
  copyObj(target, ...objs) {
    if (!utils.isPlainObject(target)) return null;
    let typeValue = {
      object: {},
      array: [],
      number: 0,
      string: "",
      null: null,
      undefined: undefined,
    };
    objs.forEach((obj) => {
      if (obj == null) {
        // 重置初始值
        Object.keys(target).forEach((key) => {
          target[key] = typeValue[utils.type(target[key])];
        });
      } else if (utils.isPlainObject(obj)) {
        Object.keys(target).forEach((key) => {
          if (key in target && obj[key] !== undefined) {
            if (
              utils.isPlainObject(target[key]) &&
              utils.isPlainObject(obj[key])
            ) {
              utils.copyObj(target[key], obj[key]);
            } else {
              target[key] = obj[key];
            }
          }
        });
      } else {
        Object.keys(target).forEach((key) => {
          target[key] = obj;
        });
      }
    });
    return target;
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
    let _merge = function (_target, _source) {
      if (utils.isPlainObject(_target) && utils.isPlainObject(_source)) {
        Object.keys(_source).forEach((key) => {
          if (
            utils.isPlainObject(_target[key]) &&
            utils.isPlainObject(_source[key])
          ) {
            _merge(_target[key], _source[key]);
          } else {
            _target[key] = _source[key];
          }
        });
      }
      return _target;
    };

    objs.forEach((obj) => {
      if (utils.isPlainObject(obj)) {
        _merge(target, obj);
      }
    });
    return target;
  },
  type(value) {
    //如果是null或者undefined，直接转成String返回
    if (value == null) return String(value);
    //RegExp，Array等都属于Object
    //为了精准判断类型，借由Object.prototype.toString跟class2type表
    //这里为什么要用core_toString而不用obj.toString的原因在刚刚试验中说明了
    return typeof value === "object" || typeof value === "function"
      ? class2type[class2type.toString.call(value)] || "object"
      : typeof value;
  },
  isPlainObject(obj) {
    // Must be an Object.
    // Because of IE, we also have to check the presence of the constructor property.
    // Make sure that DOM nodes and window objects don't pass through, as well
    if (
      !obj ||
      utils.type(obj) !== "object" ||
      obj.nodeType ||
      utils.isWindow(obj)
    ) {
      return false;
    }
    try {
      // Not own constructor property must be Object
      if (
        obj.constructor &&
        !class2type.hasOwnProperty.call(obj, "constructor") &&
        !class2type.hasOwnProperty.call(
          obj.constructor.prototype,
          "isPrototypeOf"
        )
      ) {
        return false;
      }
    } catch (e) {
      // IE8,9 Will throw exceptions on certain host objects #9897
      return false;
    }
    // Own properties are enumerated firstly, so to speed up,
    // if last one is own, then all properties are own.
    let key = undefined;
    for (key in obj) {
      /* console.log(key) */
    }
    return key === undefined || class2type.hasOwnProperty.call(obj, key);
  },
  isEmptyObject(obj) {
    for (let key in obj) {
      return false;
    }
    return true;
  },
  isFunction(obj) {
    return utils.type(obj) === "function";
  },
  isArray:
    Array.isArray ||
    function (obj) {
      return utils.type(obj) === "array";
    },
  isWindow(obj) {
    return obj != null && obj == obj.window;
  },
  isString(value) {
    return typeof value === "string";
  },
  isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  },
  setTitle(title) {
    document.title = title || "盈利云";
    // 判断是否为ios设备的微信浏览器，加载iframe来刷新title
    if (device.isWechat && device.isIphone) {
      let iframe = document.createElement("iframe");

      iframe.setAttribute(
        "style",
        "position:absolute;visibility:hidden;height:0;width:0;"
      );
      iframe.addEventListener("load", function load() {
        iframe.removeEventListener("load", load);
        document.body.removeChild(iframe);
      });

      setTimeout(() => {
        iframe.setAttribute("src", "//m.baidu.com/favicon.ico");
        document.body.appendChild(iframe);
      }, 650);
    }
  },
  history: {
    push(url, title, data) {
      this.assign(url, title, data);
    },
    replace(url, title, data) {
      this.assign(url, title, data, "replace");
    },
    assign(url = "", title = "", data = {}, action = "push") {
      window.history[action + "State"](data, title, url);
    },
  },
  url: {
    getFullPath(path = "", baseURl = location.href) {
      if (!window.URL) {
        let url = new window.URL(path, baseURl);
        return url.href;
      } else {
        let a = document.createElement("a");
        a.href = baseURl;

        let currentPath =
          a.origin + a.pathname.substr(0, a.pathname.lastIndexOf("/"));
        switch (path) {
          case ".": // 返回当前目录
            return currentPath + "/";
          case "..": // 返回上一级目录
            return this.getFullPath(".", currentPath);
          default:
            if (baseURl === location.href) {
              a.href = path;
            } else if (path.indexOf("#") === 0) {
              a.hash = path;
            } else if (path.indexOf("/") === 0) {
              a.pathname = path;
            } else {
              a.href = currentPath + "/" + path;
            }
            return a.href;
        }
      }
    },
    parse(url) {
      if (typeof url !== "string") url = window.location.href;
      let a = document.createElement("a");
      a.href = url;
      return {
        source: url,
        protocol: a.protocol.replace(":", ""),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function () {
          let ret = {};
          let seg = a.search.replace(/^\?/, "").split("&");
          let len = seg.length;
          let i = 0,
            s = null;
          for (; i < len; i++) {
            if (!seg[i]) {
              continue;
            }
            s = seg[i].split("=");
            ret[s[0]] = s[1];
          }
          return ret;
        })(),
        file: (a.pathname.match(/\/([^/?#]+)$/i) || ["", ""])[1],
        hash: a.hash.replace("#", ""),
        path: a.pathname.replace(/^([^/])/, "/$1"),
        relative: (a.href.match(/tps?:\/\/[^/]+(.+)/) || ["", ""])[1],
        segments: a.pathname.replace(/^\//, "").split("/"),
      };
    },
    getArgs(url) {
      if (typeof url !== "string") url = window.location.href;
      url = decodeURIComponent(url);
      let pos = url.indexOf("?"),
        pos2 = url.lastIndexOf("#"),
        qs =
          pos > -1
            ? url.substring(pos + 1, pos2 <= pos ? url.length : pos2)
            : "",
        items = qs.split("&");
      let args = {},
        name = null,
        value = null;
      for (let i = 0, splitPos = 0, item = null; i < items.length; i++) {
        item = items[i];
        splitPos = item.indexOf("=");
        name = item.substring(0, splitPos);
        value = item.substring(splitPos + 1);
        name && (args[name] = value);
      }

      if (pos2 !== -1) {
        args["_hash"] = url.substring(pos2 + 1, url.length);
      }

      return args;
    },
    setArgs(url, name, value) {
      if (typeof url !== "string") return "";
      if (name === undefined) return url;

      let urlArgs = utils.url.getArgs(url),
        params = [];

      if (utils.isPlainObject(name)) {
        Object.assign(urlArgs, name);
      } else if (utils.isString(name)) {
        urlArgs[name] = value;
      }

      let hash = "";
      for (let key of Object.keys(urlArgs)) {
        let val = urlArgs[key];
        if (val != undefined) {
          if (key === "_hash") {
            hash = val;
          } else {
            params.push(
              encodeURIComponent(key) + "=" + encodeURIComponent(val)
            );
          }
        }
      }

      params.length > 0 && (url = url.split("?")[0] + "?" + params.join("&"));
      hash && (url += "#" + hash);

      return url;
    },
    setHashArgs(url = location.hash, name, value) {
      if (url.indexOf("#") !== 0) return url;
      url = url.substring(1);

      return "#" + utils.url.setArgs(url, name, value);
    },
    reload(url = window.location.href) {
      window.location.replace(this.setArgs(url, "t", Date.now()));
    },
    /* 
      url.join('/url1', '//url2', 'url3/url4', 'url5//url6/url7//url8/', 'url9/', 'url10', null)
      => url1/url2/url3/url4/url5/url6/url7/url8/url9/url10 
    */
    join(...paths) {
      let passPath = [];
      paths
        .filter((url) => utils.isString(url))
        .map((url) => {
          url = url
            .replace(/(https:\/|http:\/)?\/+/g, "$1/")
            .replace(/^\/+|\/+$/g, "");
          if (url) {
            passPath.push(url);
          }
        });
      return passPath.join("/");
    },
  },
  imgThumb(src = "", width, height) {
    width = width || 320;
    if (!src) {
      // return `https://placeholdit.imgix.net/~text?txtsize=20&bg=ffffff&txtclr=999&txt=image&w=${width}&h=${width}`
      return "";
    }
    if (src.indexOf("qiniu") === -1) {
      return src;
    }
    // return src += '?imageMogr2/gravity/Center/crop/'+width+'x'+height;
    src += `?imageMogr2/format/jpg/interlace/1/quality/60/gravity/Center/thumbnail/${width}x`;
    if (height) {
      src += `/crop/x${height}`;
    }
    return src;
  },
  videoThumb(src = "", width = 320, height = 320) {
    if (!src) {
      // return `https://placeholdit.imgix.net/~text?txtsize=20&bg=ffffff&txtclr=999&txt=image&w=${width}&h=${width}`
      return "";
    }
    if (src.indexOf("qiniu") === -1) {
      return src;
    }
    // return src += '?imageMogr2/gravity/Center/crop/'+width+'x'+height;
    src += `?vframe/jpg/offset/1/w/${width}/h/${height}`;
    return src;
  },
  wxHead(src, size = 132) {
    if (!src) {
      return `https://placeholdit.imgix.net/~text?txtsize=16&bg=999&txtclr=fff&txt=%E5%9B%BE%E7%89%87%E7%BC%BA%E5%A4%B1&w=${size}&h=${size}`;
    }
    if (src.indexOf("wx.qlogo.cn") === -1) {
      return src;
    }
    // 有0、46、64、96、132数值可选，0代表640*640正方形头像
    return src.replace(/\/0$/, "/" + size);
  },
  imgCompress(
    src = "",
    maxWidth = 320,
    maxHeight = 320,
    outputFormat = "image/jpeg"
  ) {
    // 图片压缩裁剪
    if (!src) return Promise.reject("图片路径不存在");
    let that = this;
    // let typeMatch = src.match(/^data\:(.+)\;base64\,/)
    // if(typeMatch && typeMatch[1]) {
    //   outputFormat = typeMatch[1]
    // }
    return new Promise((resolve) => {
      // 缩放图片需要的canvas
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      // base64地址图片加载完毕后
      let img = new Image();
      img.onload = function () {
        // 图片原始尺寸
        let originWidth = this.width;
        let originHeight = this.height;
        // 目标尺寸
        let targetWidth = originWidth;
        let targetHeight = originHeight;
        // 图片尺寸超过400x400的限制
        if (originWidth > maxWidth || originHeight > maxHeight) {
          if (originWidth / originHeight > maxWidth / maxHeight) {
            // 更宽，按照宽度限定尺寸
            targetWidth = maxWidth;
            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
          } else {
            targetHeight = maxHeight;
            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
          }
        }
        // canvas对图片进行缩放
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        // 清除画布
        context.clearRect(0, 0, targetWidth, targetHeight);
        // 图片压缩
        context.drawImage(img, 0, 0, targetWidth, targetHeight);
        // canvas转为blob并上传
        let imgBlob = that.base64ToBlob(
          canvas.toDataURL(outputFormat, 0.8),
          outputFormat
        );
        resolve(imgBlob);
        // canvas.toBlob(resolve,  outputFormat)
      };
      img.src = src;
    });
  },
  imgToBase64(src = "", outputFormat = "image/jpeg") {
    if (!src) return Promise.reject("图片路径不存在");
    return new Promise((resolve) => {
      var canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d"),
        img = new Image();
      img.crossOrigin = "";
      img.onload = function () {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL(outputFormat));
      };
      img.src = src;
    });
  },
  base64ToBlob(base64Data, type = "image/png") {
    //去掉url的头，并转换为byte
    var bytes = atob(base64Data.split(",")[1]);
    //处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], {
      type,
    });
  },
  // 对象属性名排序
  ksort(inputArr, sortFlags) {
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

    let tmpArr = {};
    let keys = [];
    let sorter;
    let i;
    let k;
    let that = this;
    let strictForIn = false;
    let populateArr = {};

    switch (sortFlags) {
      case "SORT_STRING":
        // compare items as strings
        sorter = function (a, b) {
          return that.strnatcmp(a, b);
        };
        break;
      case "SORT_LOCALE_STRING":
        // compare items as strings, original by the current locale (set with  i18n_loc_set_default() as of PHP6)
        var loc = this.i18n_loc_get_default();
        sorter = this.php_js.i18nLocales[loc].sorting;
        break;
      case "SORT_NUMERIC":
        // compare items numerically
        sorter = function (a, b) {
          return a + 0 - (b + 0);
        };
        break;
      // case 'SORT_REGULAR': // compare items normally (don't change types)
      default:
        sorter = function (a, b) {
          let aFloat = parseFloat(a);
          let bFloat = parseFloat(b);
          let aNumeric = aFloat + "" === a;
          let bNumeric = bFloat + "" === b;
          if (aNumeric && bNumeric) {
            return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
          } else if (aNumeric && !bNumeric) {
            return 1;
          } else if (!aNumeric && bNumeric) {
            return -1;
          }
          return a > b ? 1 : a < b ? -1 : 0;
        };
        break;
    }

    // Make a list of key names
    for (k in inputArr) {
      if (inputArr.hasOwnProperty(k)) {
        keys.push(k);
      }
    }
    keys.sort(sorter);

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
    // END REDUNDANT
    strictForIn =
      this.php_js.ini["phpjs.strictForIn"] &&
      this.php_js.ini["phpjs.strictForIn"].local_value &&
      this.php_js.ini["phpjs.strictForIn"].local_value !== "off";
    populateArr = strictForIn ? inputArr : populateArr;

    // Rebuild array with sorted key names
    for (i = 0; i < keys.length; i++) {
      k = keys[i];
      tmpArr[k] = inputArr[k];
      if (strictForIn) {
        delete inputArr[k];
      }
    }
    for (i in tmpArr) {
      if (tmpArr.hasOwnProperty(i)) {
        populateArr[i] = tmpArr[i];
      }
    }

    return strictForIn || populateArr;
  },
  // 接口签名
  sign(obj = {}) {
    let localKey = "DFHGKZLSE2NFDEHGFHHR4XTGBKHY67EJZ8IK9";
    let newObj = this.ksort(obj);
    let ret = [];
    Object.keys(newObj).forEach((name) => {
      if (newObj[name] != null && newObj[name] !== undefined) {
        ret.push(name + "=" + newObj[name]);
      }
    });
    return ret.join("&") + localKey;
  },
};

// 当前系统平台：默认后台端(admin) 经纪人(agent) 无登录端(nologin)
let urlArgs = utils.url.getArgs()
if (urlArgs._plat) {
  utils.platform = urlArgs._plat
} else {
  utils.platform = storage.local.get('platform') || 'admin'
}
// 当前平台本地存储前缀
storage.local.set('platform', utils.platform)
storage.setPrefix(utils.platform)
