let config = {
  avatar: require('./assets/images/avatar.png'),
  regexp: {
    int: /^\d{1,10}$/,
    tel: /^1\d{10}$/,
    money: /^\d{1,9}(\.\d{1,2})?$/
  },
  editorOption: {
    placeholder: '请在这里输入内容...',
    modules: {
      toolbar: [
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'font': [] }],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        // [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['clean'],
        ['link', 'image']
      ],
      history: {
        delay: 1000,
        maxStack: 50,
        userOnly: false
      },
      imageDrop: true,
      imageResize: {
        displayStyles: {
          backgroundColor: 'black',
          border: 'none',
          color: 'white'
        },
        modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
      }
    }
  },
  qrcodeOption: {
    data: '',
    cellSize: 5,
    correctLevel: 'H',
    typeNumber: 5,
    logo: {
      fontFamily: 'Arial',
      size: 0.15,
      color: '#000',
      text: '',
      clearEdges: 2,
      margin: 10
    },
    effect: {
      key: 'round',
      value: 0.2
    }
  },
  dateOptions: {
    disabledDate(time) {
      return time.getTime() > Date.now()
    }
  },
}

export default config
