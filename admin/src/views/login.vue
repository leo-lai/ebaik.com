<template>
  <div class="l-login l-flex-vhc">
    <el-form class="l-login-form" ref="loginForm" label-position="left" label-width="0px" :model="loginForm.data" :rules="loginForm.rules" @keyup.native.enter="submit">
      <p class="_tit">欢迎登录</p>
      <el-form-item prop="account">
        <el-input class="l-no-bg" v-model.trim="loginForm.data.account" type="tel" :maxlength="11" placeholder="请输入用户名">
          <template slot="prepend">
            <span class="_label"><i class="l-icon l-margin-r-m">&#xe6b6;</i></span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input class="l-no-bg" type="password" v-model.trim="loginForm.data.password" placeholder="请输入密码" >
          <template slot="prepend">
            <span class="_label"><i class="l-icon l-margin-r-m">&#xe646;</i></span>
          </template>
          <template slot="append"><router-link class="l-txt-link l-fs-s" :to="'/forgot?phone=' + loginForm.data.account">忘记密码？</router-link></template>
        </el-input>
      </el-form-item>
      <div class="l-txt-right">
        
      </div>
      <el-form-item>
        <el-button type="primary" style="width: 100%; margin-top: 1rem;" @click.native.prevent="submit" :loading="loginForm.loading">登录</el-button>
        <br>
        <el-button v-if="$router.platform === 'shop'" plain style="width: 100%; margin-top: 1rem;" @click.native="$router.push('/register')">还没账号？立即注册</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        loading: false,
        remember: true,
        data: {
          account: '',
          password: ''
        },
        rules: {
          account: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    }
  },
  methods: {
    submit () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loginForm.loading = true
          setTimeout(() => {
            this.loginForm.loading = false
            this.$storage.local.set('token', 'xxxxxxxxxxxxxxxxxxxxxxxxxxx')
            this.$href(this.$route.query.to || '/', 'replace')
          }, 1000)
        }
      })
    }
  }
}

</script>
<style scoped lang="less">
.l-login {
  height: 100%;
  padding: 0.75rem;
  box-sizing: border-box;
}
.l-login-form {
  background: rgba(15, 11, 0, 0.6); box-sizing: border-box;
  width: 450px; color: #fff;
  padding: 35px 70px 15px;
  ._tit { margin: 0px auto 40px auto; text-align: center; color: #fff; font-size: 32px; }
}
</style>
