<template>
  <div class="l-login l-flex-vhc">
    <el-form class="l-login-form" ref="passForm" label-position="left" label-width="0px" :model="formData.data" :rules="formData.rules" @keyup.native.enter="submit">
      <p class="_tit">重置密码</p>
      <el-form-item prop="account">
        <el-input class="l-no-bg" type="text" v-model.trim="formData.data.account" placeholder="请输入手机号码" :maxlength="11">
          <i v-show="formData.checking" slot="suffix" class="el-icon-loading el-input__icon"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <div class="l-flex-hc">
          <el-input class="l-no-bg" type="text" v-model.trim="formData.data.code" placeholder="请输入短信验证码"  :maxlength="6">
          </el-input>
          <el-button class="l-margin-l" size="mini" style="width: 120px;" ref="sendCode" type="primary" plain @click.prevent="sendCode()">获取验证码</el-button>
        </div>
      </el-form-item>
      <el-form-item prop="password">
        <el-input class="l-no-bg" type="password" v-model.trim="formData.data.password" placeholder="请输入新密码" :maxlength="50"/>
      </el-form-item>
      <el-form-item prop="repassword">
        <el-input class="l-no-bg" type="password" v-model.trim="formData.data.repassword" placeholder="请再次确认新密码"  :maxlength="50"/>
      </el-form-item>
      <el-form-item>
        <div class="l-flex-hc">
          <el-button style="width: 100%;" type="primary" @click.native.prevent="submit" :loading="formData.loading">提交</el-button>
        </div>
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
          this.$refs.passForm.validateField('repassword')
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
        register: false,
        loading: false,
        data: {
          account: '',
          code: '',
          password: '',
          repassword: '',
        },
        rules: {
          account: [
            { required: true, message: '请输入手机号码', trigger: 'blur' }
          ],
          code: [
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
      this.$refs.passForm.validateField('account')
      if(this.formData.data.account && !this.formData.checking) {
        this.formData.checking = true
        this.$api.auth.checkUser(this.formData.data.account).then(() => {
          this.formData.register = true
          this.$api.sendMobiCode(this.formData.data.account, this.$refs.sendCode.$el)
        }).finally(() => {
          this.formData.checking = false
        })
      }
    },
    submit () {
      this.$refs.passForm.validate(valid => {
        if (valid) {
          let formData = Object.assign({}, this.formData.data)

          this.formData.loading = true
          this.$api.auth.findPwd(formData).then(() => {
            this.$message({
              type: 'success',
              message: '重置密码成功',
              onClose: () => {
                this.$router.back()
              }
            })
          }).catch(() => {
            this.formData.loading = false
          })
        }
      })
    }
  },
  mounted() {
    if(this.$route.query.phone) {
      this.formData.data.account = this.$route.query.phone
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
