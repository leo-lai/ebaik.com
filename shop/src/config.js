const resURL = 'https://res.xfnauto.com'
const apiURL = window.location.host.indexOf('xfnauto.com') !== -1 ? 'https://tomcat.xfnauto.com/tauto' : 'http://tomcat.mifengqiche.com/tauto'
let config = {
  resURL,
  apiURL,
  avatar: require('./assets/images/avatar.png')
}

export default config