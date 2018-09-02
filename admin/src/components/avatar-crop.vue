<template>
  <!-- 图片裁剪 -->
  <avatar-crop v-model="show" field="image"
               :url="$api.uploadURL"
               @crop-success="cropSuccess"
               @crop-upload-success="cropUploadSuccess"
               @crop-upload-fail="cropUploadFail"
               :width="200"
               :height="200"
               :params="params"
               :headers="headers"
               img-format="png"></avatar-crop>
</template>
<script>
import AvatarCrop from 'vue-image-crop-upload'
export default {
  components: {
    AvatarCrop
  },
  data() {
    return {
      params: {
        timestamp: Date.now(),
        sign: ''
      },
      headers: {
        smail: '*_~'
      },
    }
  },
  model: {
    prop: 'visible',
    event: 'crop:visible'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    show: {
      get() {
        return this.visible
      },
      set(newValue) {
        this.$emit('crop:visible', newValue)
      }
    }
  },
  methods: {
    /**
     * crop success
     *
     * [param] imgDataUrl
     * [param] field
     */
    cropSuccess(imgDataUrl, field){
    },
    /**
     * upload success
     *
     * [param] jsonData   服务器返回数据，已进行json转码
     * [param] field
     */
    cropUploadSuccess({ data }, field){
      this.$emit('crop:success', data.url)
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field){
      this.$emit('crop:upload:fail', status)
      this.$message.error('头像上传失败')
    }
  }
}
</script>
<style lang="less">

</style>