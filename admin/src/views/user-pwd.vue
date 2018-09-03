<template>
  <el-container class="l-h100">
    <el-header class="l-padding-0 l-bg-white" height="auto">
      <div class="l-filter-top">
        <ul class="l-tab-tit">
          <li class="_active2">修改密码</li>
        </ul>
      </div>
    </el-header>
    <el-main class="l-bg-white">
      <br>
      <el-form ref="infoForm" label-width="110px" @submit.native.prevent style="width: 350px;">
        <el-form-item label="输入原密码" prop="oldpassword">
          <el-input type="password" v-model="formData.oldpassword" :maxlength="50" ></el-input>
        </el-form-item>
        <el-form-item label="输入新密码" prop="password">
          <el-input type="password" v-model="formData.password" :maxlength="50" ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="repassword">
          <el-input type="password" v-model="formData.repassword" :maxlength="50" ></el-input>
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary" >&emsp;确认&emsp;</el-button>
          <el-button @click.native="$router.push('/login')">退出登录</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: 'user-pwd',
  components: {
  },
  data() {
    return {
      formData: {}
    }
  },
  computed: {
    
  },
  methods: {
  },
  mounted() {
  }
}
</script>
<style scoped lang="less">

</style>