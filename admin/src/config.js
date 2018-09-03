let config = {
  avatar: require('./assets/images/avatar.png'),
  regexp: {
    int: /^\d{1,10}$/,
    tel: /^1\d{10}$/,
    money: /^\d{1,9}(\.\d{1,2})?$/
  },
  dateOptions: {
    disabledDate(time) {
      return time.getTime() > Date.now()
    }
  },
}

export default config
