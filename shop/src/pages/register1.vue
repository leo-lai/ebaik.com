<template>
  <view-box style="z-index: 10;">
    <div class="l-register-logo">
      <img src="../assets/images/20180602001.png" alt="">
    </div>
    <div class="l-register-yizai">
      <img src="../assets/images/20180602002.jpg" alt="">
    </div>

    <div class="l-register-power">
      <h4>成为宜百客会员享以下权利</h4>
      <img src="../assets/images/20180602003.jpg" alt="">
      <ul>
        <li>下单后10分钟内免费送货</li>
        <li>玩转所有宜百客自动售货机</li>
        <li>享会员积分和超级折扣</li>
        <li>立享30元现金红包</li>
      </ul>      
    </div>
    <br>
    <div class="l-margin">
      <x-button link="/register2" type="primary">立即成为宜百客会员</x-button>
    </div>

    <div class="l-margin">
      <x-button link="/login" plain  type="primary">已是宜百客会员点此</x-button>
    </div>


  </view-box>
</template>

<script>
export default {
  name: 'register1',
  data () {
    return {
      
    }
  },
  methods: {
    
  },
  mounted() {
  }
}
</script>

<style lang="less">
.l-register-logo{
  text-align: center;
  padding-top: 119px;
  img{position: absolute; top: -35px; left: 50%; margin-left: -60px; width: 120px; height: 120px;vertical-align: top;}
}
.l-register-yizai{
  text-align: center;
  img{vertical-align: top;}
}
.l-register-power{
  padding: 15px; background-color: #fff;
}

.l-register-power{
  ul{margin: 10px 0 0 15px; color: #666;}
  img{float: right; width: 90px;}
}
</style>

