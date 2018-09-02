<template>
  <div id="app">
    <el-container class="l-h100" direction="vertical " :class="{'l-fullscreen': fullscreen}">
      <el-header class="l-header l-flex-hc" height="70px">
        <b class="_logo-txt">微米物联内部业务管理系统</b>
        <div class="l-rest">
        </div>
        <div class="l-txt-right">
          <el-dropdown class="l-margin-r" trigger="click">
            <span> leilai<i class="el-icon-caret-bottom" /></span>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item @click.native="$router.push('/me')">
                <i class="l-icon l-margin-r-m">&#xe6b6;</i>个人中心
              </el-dropdown-item> -->
              <el-dropdown-item @click.native="logout">
                <i class="l-icon l-margin-r-m">&#xe682;</i>退出系统
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <a @click="fullScreen">
            <i class="el-icon-rank" title="切换全屏" />
          </a>
        </div>
      </el-header>
      <el-container class="l-h100">
        <el-aside class="l-aside" :class="{'l-aside-collapse': collapse}">
          <el-menu class="l-menu" :default-active="$route.meta.menu" router :collapse="collapse" background-color="#343b47" text-color="#fff">
            <el-menu-item v-for="menu in userMenus" :index="menu.meta.menu" :key="menu.path" :route="{path: menu.path}">
              <i :class="menu.meta.icon"></i>
              <span slot="title">{{menu.meta.title}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="l-main">
          <transition name="fade" mode="out-in">
            <router-view/>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import screenfull from 'screenfull'

export default {
  name: 'layout',
  data() {
    return {
      noticeCount: ''
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'fullscreen',
      'collapse'
    ]),
    userMenus() {
      let menuList = this.$router.options.routes[0].children.filter(item => {
        if(item.meta.role && !this.$utils.strcpr(item.meta.role, this.userInfo.roleCode)) {
          item.hidden = true
        }
        return !item.hidden
      })
      
      return menuList.map(item => {
        return {
          meta: item.meta,
          path: item.path || '/'
        }
      })
    }
  },
  methods: {
    doCollapse() {
      this.$store.dispatch('toggleCollapse')
    },
    initSomething() {
      // 全屏设置
      if (screenfull.enabled) {
        screenfull.on('change', () => {
          this.$store.dispatch('toggleFullscreen', screenfull.isFullscreen)
        })
      }
      document.addEventListener('keyup', e => {
        e = e || window.event
        if (e && e.keyCode === 122) {
          this.fullScreen()
        }
      })
    },
    fullScreen() {
      if (!screenfull.enabled) {
        this.$message.error('sorry, you browser can not work!')
        this.$store.dispatch('toggleFullscreen')
        return false
      }
      screenfull.toggle()
    },
    logout() {
      this.$router.push('/login?to=' + location.href)
    }
  },
  mounted() {
    this.initSomething()
  }
}
</script>
<style lang="less" scoped>
.l-header{
  border-bottom: 2px solid #eab024;
  ._logo{ margin-left:  -60px; }
}
</style>


