<template>
  <div class="l-viewer">
    <!-- 预览图片 -->
    <span v-for="(item,index) in files" :key="item.guid" class="_img" :style="{'background-image': 'url('+ item.thumb + ')'}" @click="preview(index)" :data-source="item.src">
    </span>

    <!-- viewerjs html结构 -->
    <div class="_hidden" ref="viewer">
      <img v-for="item in files" :key="item.guid" :src="item.thumb" :data-source="item.src">
    </div>

    <transition name="page-fade">
      <div class="_video l-flex-vhc" v-if="video.visible" key="video" @click="video.visible = false">
        <div class="_w500">
          <video style="object-fit: fill;" webkit-playsinline="true" x-webkit-airplay="true"  playsinline="true" x5-video-player-type="h5" x5-video-player-fullscreen="true" width="100%" preload="auto" autoplay controls :poster="video.poster" :src="video.src"></video>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'
const defaults = {
  zIndex: 10000,
  inline: false,
  button: true,
  navbar: true,
  title: false,
  toolbar: true,
  tooltip: false,
  movable: true,
  zoomable: true,
  rotatable: true,
  scalable: true,
  transition: true,
  fullscreen: true,
  keyboard: true,
  url: 'data-source'
}
export default {
  name: 'image-previewer',
  data() {
    return {
      video: {
        visible: false,
        poster: '',
        src: ''
      }
    }
  },
  props: {
    fileList: {
      type: Array,
      default() {
        return []
      }
    },
    type: {
      type: String,
      default: 'image'
    }
  },
  computed: {
    files() {
      return this.$utils.isArray(this.fileList) ? this.fileList.map(item => {
        return {
          guid: this.$utils.guid(),
          src: item,
          thumb: this.type === 'video' ? this.$utils.videoThumb(item, 320, 200) : this.$utils.imgThumb(item, 150, 150),
        }
      }) : []
    }
  },
  methods: {
    createViewer (index = 0) {
      if(!this.files || this.files.length === 0) return

      if(this.$viewer && this.$viewer.ready){
        this.$viewer.update()
        this.$viewer.reset()
      }else {
        this.destroy()
        this.$viewer = new Viewer(this.$refs.viewer, Object.assign({}, defaults, this.options))
      }

      setTimeout(() => {
        this.$viewer.index = index
        this.$viewer.show()
      }, 50)
    },
    preview(index = 0) {
      if(this.type === 'video'){
        // 播放视频
        this.video.src = this.files[index].src
        this.video.poster = this.files[index].thumb
        this.video.visible = true
      }else{
        // 预览图片
        this.createViewer(index)
      }
    },
    destroy() {
      this.$viewer && this.$viewer.ready && this.$viewer.destroy()
    }
  },
  destroyed () {
    this.destroy()
  }
}
</script>
<style lang="less" scoped>
.l-viewer{
  display: inline-block; overflow: hidden;
  ._img{
    float: left; position: relative;
    width: 80px; height: 80px;
    background: #eee no-repeat 50% 50%;
    background-size: cover;
    margin: 0 8px 8px 0;
    border:1px solid #c0ccda; box-sizing: border-box; 
  }
  ._hidden{
    position: fixed; top:0; left:0; width: 0; height: 0;  z-index: -1; overflow: hidden;
    img{display: none;}
  }
  ._video{
    position: fixed; top: 0; left: 0; bottom: 0; right: 0; background-color: #000; z-index: 1000;
    ._w500{
      width: 600px;
    }
  }
}
.viewer-container{background-color: rgba(0, 0, 0, .9) !important}
.viewer-button{width: 90px !important; height: 90px !important; transform: scale(1.2);}
</style>