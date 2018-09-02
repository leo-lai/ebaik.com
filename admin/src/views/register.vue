<template>
  <div class="l-login l-flex-vhc">
    <el-form class="l-login-form" ref="infoForm" label-position="left" label-width="0px" :model="formData.data" :rules="formData.rules" @keyup.native.enter="submit">
      <p class="_tit">注册账号</p>
      <el-form-item prop="account">
        <el-input class="l-no-bg" type="text" v-model.trim="formData.data.account" placeholder="请输入手机号码" :maxlength="11">
          <i v-show="formData.checking" slot="suffix" class="el-icon-loading el-input__icon"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <div class="l-flex-hc">
          <el-input class="l-no-bg" type="text" v-model.trim="formData.data.code" placeholder="请输入短信验证码"  :maxlength="6"/>
          <el-button class="l-margin-l" size="small" style="width: 120px;" ref="sendCode" type="primary" plain @click.prevent="sendCode()">获取验证码</el-button>
        </div>
      </el-form-item>
      <el-form-item prop="password">
        <el-input class="l-no-bg" type="password" v-model.trim="formData.data.password" placeholder="请输入6~20位密码" :maxlength="50"/>
      </el-form-item>
      <el-form-item prop="repassword">
        <el-input class="l-no-bg" type="password" v-model.trim="formData.data.repassword" placeholder="请再次输入密码" :maxlength="50"/>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%;" type="primary" @click.native.prevent="submit" :loading="formData.loading">提交注册</el-button>
        <br>
        <el-button plain style="width: 100%; margin-top: 1rem;" @click.native="$router.replace('/login')">已有账号，返回登录</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  name: 'forgot',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.formData.data.repassword !== '') {
          this.$refs.infoForm.validateField('repassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'));
      } else if (value !== this.formData.data.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      formData: {
        checking: false,
        loading: false,
        data: {
          account: '',
          code: '',
          password: '',
          repassword: '',
        },
        rules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          smcode: [
            { required: true, message: '请输入短信验证码', trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          repassword: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    }
  },
  methods: {
    sendCode() {
      this.$refs.infoForm.validateField('account')
      if(this.formData.data.account && !this.formData.checking) {
        this.formData.checking = true
        this.$api.auth.checkUser(this.formData.data.account).then(({data}) => {
          if(data.state === 0) {
            this.$api.sendMobiCode(this.formData.data.account, this.$refs.sendCode.$el).then(() => {
              this.$message.success('验证码已发送到您的手机，请注意查收')
            })
          }else{
            this.$message.error('该手机号码已注册')
          }
        }).finally(() => {
          this.formData.checking = false
        })
      }
    },
    submit () {
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          let formData = Object.assign({}, this.formData.data)

          this.formData.loading = true
          this.$api.auth.register(formData).then(() => {
            this.$message({
              type: 'success',
              message: '注册成功',
              onClose: () => {
                this.$router.replace('/login')
              }
            })
          }).catch(() => {
            this.formData.loading = false
          })
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
