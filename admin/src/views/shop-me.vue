<template>
  <el-container class="l-h100">
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="l-bg-white l-margin-t">
        <div class="l-tab">
          <i v-show="loading" class="el-icon-loading l-fs-x2 l-fr l-padding"></i>
          <ul class="l-tab-tit">
            <li class="_active0">账号基本信息</li>
            <li @click="$router.replace('/shop/auth/info')">门店认证资料</li>
            <!-- <li @click="$router.replace('/shop/amount')">额度管理</li> -->
          </ul>
        </div>
        <div v-if="userInfo" class="l-padding-xl">
          <table class="l-table-02" style="width: 800px;">
            <tr>
              <td width="100" class="_tit">账号头像</td>
              <td class="_noright"><img class="l-avatar" :src="userInfo.portrait || $config.avatar" alt=""></td>
              <td width="30" @click="avatar.visible = true"><i class="el-icon-edit-outline"></i></td>
            </tr>
            <tr>
              <td width="100" class="_tit">账号ID</td>
              <td class="_noright">{{userInfo.userId}}</td>
              <td width="30"></td>
            </tr>
            <tr>
              <td width="100" class="_tit">用户名称</td>
              <td class="_noright">{{userInfo.userName}}</td>
              <td width="30" @click="showDialog(1)"><i class="el-icon-edit-outline"></i></td>
            </tr>
            <tr>
              <td width="100" class="_tit">手机号码</td>
              <td class="_noright">{{userInfo.phone}}</td>
              <td width="30"><!-- <i class="el-icon-edit-outline"></i> --></td>
            </tr>
            <tr>
              <td width="100" class="_tit">电子邮箱</td>
              <td class="_noright">{{userInfo.email}}</td>
              <td width="30" @click="showDialog(2)"><i v-if="!userInfo.email" class="el-icon-edit-outline"></i></td>
            </tr>
            <tr>
              <td width="100" class="_tit">登录密码</td>
              <td class="_noright">**********</td>
              <td width="30" @click="showDialog(3)"><i class="el-icon-edit-outline"></i></td>
            </tr>
          </table>
        </div>
      </div>
      <el-dialog :before-close="closeDialog" :title="dialog.title" :visible.sync="dialog.visible" width="450px">
        <el-form class="l-dialog-form l-margin-r" ref="infoForm" label-width="90px" @submit.native.prevent @keyup.enter.native="submitDialog">
          <div v-if="dialog.type === 1">
            <el-form-item label="用户名称" prop="userName">
              <el-input v-model="dialog.data.userName" :maxlength="50" ></el-input>
            </el-form-item>
          </div>
          <div v-else-if="dialog.type === 2">
            <el-form-item label="电子邮箱" prop="email">
              <div class="l-flex-hc">
                <el-input type="text" v-model.trim="dialog.data.email" placeholder="请输入常用电子邮箱"  :maxlength="100"/>
              </div>
            </el-form-item>
            <el-form-item label="邮箱验证码" prop="newCode">
              <div class="l-flex-hc">
                <el-input type="text" v-model="dialog.data.newCode" placeholder="请输入邮箱验证码" :maxlength="6" ></el-input>
                <el-button class="l-margin-l" style="width: 120px;" ref="sendCode" type="primary" plain @click.prevent="sendCode()">获取验证码</el-button>
              </div>
            </el-form-item>
          </div>
          <div v-else-if="dialog.type === 3">
            <el-form-item label="原密码" prop="oldpassword">
              <el-input type="password" v-model="dialog.data.oldpassword" :maxlength="50" >
                <template slot="append">
                  <router-link class="l-fs-xs l-txt-link" :to="'/forgot?phone=' + userInfo.phone">忘记密码？</router-link>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="password">
              <el-input type="password" v-model="dialog.data.password" :maxlength="50" ></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="repassword">
              <el-input type="password" v-model="dialog.data.repassword" :maxlength="50" ></el-input>
            </el-form-item>
          </div>
        </el-form>
        <span slot="footer" class="l-margin-r-m">
          <el-button white @click="closeDialog()">取消</el-button>
          <el-button type="primary" :loading="dialog.loading" @click="submitDialog">{{ dialog.loading ? '提交中...' : '确定提交'}}</el-button>
        </span>
      </el-dialog>

      <!-- 头像裁剪 -->
      <avatar-crop v-model="avatar.visible" @crop:success="cropSuccess"></avatar-crop>
    </el-main>
  </el-container>
</template>
<script>
import { mapGetters } from 'vuex'
import AvatarCrop from '@/components/avatar-crop'
export default {
  name: 'shop-me',
  components: {
    AvatarCrop
  },
  data() {
    return {
      loading: false,
      avatar: {
        visible: false,
      },
      dialog: {
        type: 1, // 1.修改用户名称, 2.设置邮箱 3.修改密码
        title: '',
        visible: false,
        loading: false,
        data: {
          portrait: '',
          userName: '',

          email: '',
          newCode: '',
          
          oldpassword: '',
          password: '',
          repassword: '',
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  methods: {
    cropSuccess(imgURL){
      this.loading = true
      this.$api.auth.setInfo({ portrait: imgURL, userName: this.userInfo.userName})
      .then(() => {
        this.$message.success('头像修改成功')
        this.userInfo.portrait = imgURL
      }).finally(() => {
        this.loading = false
      })
    },
    sendCode() {
      if(!this.dialog.data.email) {
        return this.$message.error('请输入电子邮箱') 
      }
      this.$api.sendMobiCode(this.dialog.data.email, this.$refs.sendCode.$el).then(() => {
        this.$message.success('验证码已发送到您的邮箱，请注意查收')
      })
    },
    getInfo() {
      this.loading = true
      this.$store.dispatch('getUserInfo').finally(() => {
        this.loading = false
      })
    },
    showDialog(type = 1) {
      this.dialog.type = type
      this.$utils.copyObj(this.dialog.data, '')
      switch(type) {
        case 1:
          this.dialog.title = '修改用户名称'
          this.dialog.data.portrait = this.userInfo.portrait
          this.dialog.data.userName = this.userInfo.userName
          break
        case 2:
          this.dialog.title = '绑定邮箱'
          break
        case 3:
          this.dialog.title = '修改登录密码'
          break
      }
      this.dialog.visible = true
    },
    closeDialog(done) {
      if(done) {
				done()
			}else{
				this.dialog.visible = false	
      }
    },
    submitDialog() {
      switch(this.dialog.type) {
        case 1:
          if(!this.dialog.data.userName) {
            return this.$message.error('请输入用户名称')
          }
          this.dialog.loading = true
          this.$api.auth.setInfo(this.$utils.copyObj({ portrait: '', userName: ''} , this.dialog.data))
          .then(() => {
            this.$message.success('修改用户名称成功')
            this.closeDialog()
            this.getInfo()
          }).finally(() => {
            this.dialog.loading = false
          })
          break
        case 2:
          if(!this.dialog.data.newCode) {
            return this.$message.error('请输入邮箱验证码')
          }
          this.dialog.loading = true
          this.$api.auth.setEmail(this.$utils.copyObj({ email: '', newCode: ''} , this.dialog.data))
          .then(() => {
            this.$message.success('绑定邮箱成功')
            this.closeDialog()
            this.getInfo()
          }).finally(() => {
            this.dialog.loading = false
          })
          break
        case 3:
          if(!this.dialog.data.oldpassword) {
            return this.$message.error('请输入原密码')
          }
          if(!this.dialog.data.password) {
            return this.$message.error('请输入新密码')
          }
          if(this.dialog.data.repassword !== this.dialog.data.password) {
            return this.$message.error('两次密码不一致')
          }
          this.dialog.loading = true
          this.$api.auth.changePwd(this.$utils.copyObj({ 
            oldpassword: '', password: '', repassword: ''
          } , this.dialog.data)).then(() => {
            this.$message.success('修改登录密码成功')
            this.closeDialog()
          }).finally(() => {
            this.dialog.loading = false
          })
          break
      }
    }
  },
  mounted() {
    this.getInfo()
  }
}
</script>
<style scoped lang="less">

</style>