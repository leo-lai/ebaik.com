<template>
  <div>
    <el-upload class="l-upload-card"  :class="{'_limit': files.length >= limit }" name="image" accept="image/*"  list-type="picture-card" multiple
               :limit="limit"
               :file-list="files"
               :action="$api.uploadURL" 
               :on-success="uploadSuccess"
               :on-remove="uploadRemove"
               :on-preview="uploadPreview" 
               :on-progress="uploadProgress" 
               :on-error="uploadError" 
               :on-exceed="uploadExceed"
               :before-upload="uploadBefore">
      <i class="el-icon-plus"></i>
    </el-upload>

    <!-- 预览图片 -->
    <image-previewer style="display:none;" ref="viewer" :file-list="fileList"></image-previewer>
  </div>
</template>
<script>
import ImagePreviewer from '@/components/image-previewer'
export default {
  components: {
    ImagePreviewer
  },
  props: {
    fileList: {
      type: Array,
      default() {
        return []
      }
    },
    limit: {
      type: Number,
      default: 12
    }
  },
  data() {
    return {
      waiting: 0,
      fileNum: 0    // 已选择文件数
    }
  },
  computed: {
    files: {
      get() {
        return this.fileList.map(item => {
          return {
            name: this.$utils.guid(),
            url: this.$utils.imgThumb(item, 150, 150),
            src: item,
            status: 'success'
          }
        })
      },
      set(newValue) {
        this.$emit('update:fileList', newValue && newValue.length >= 0 ? newValue.map(item => item.src) : [])
      }
    },
    images(){
      return [...this.samplePic]
    }
  },
  watch: {
    files:{
      immediate: true,
      handler(newValue) {
        this.fileNum = newValue.length
      }
    }
  },
  methods: {
    uploadSuccess(response, file) {
      this.files.push({
        name: file.name,
        url: this.$utils.imgThumb(response.data.url, 150, 150),
        src: response.data.url,
        status: 'success'
      })
      if(--this.waiting <= 0) {
        let files = this.files.map(item => item.src)
        this.$emit('upload-success', files)
        this.$emit('update:fileList', files)
      }
    },
    uploadBefore() {
      ++this.fileNum
      ++this.waiting
    },
    uploadPreview(file) {
      this.$refs.viewer.preview(this.files.findIndex(item => item.url === file.url) || 0)
    },
    uploadRemove(file) {
      if(file.status === 'success') {
        this.files = this.files.filter(item =>  {
          if(file.response) {
            return item.src !== file.response.data.url
          }else {
            return item.src !== (file.src || file.url)
          }
        })
      }else {
        --this.waiting
      }
      --this.fileNum
    },
    uploadProgress(event, file, fileList) {
      // console.log(event, file, fileList)
    },
    uploadError(error, file) {
      // this.$message.error(`图片${file.name}上传失败`)
      this.$notify.error({
        title: '上传失败',
        message: `图片${file.name}上传失败`
      })
    },
    uploadExceed() {
      this.$message.error('最多上传' + this.limit + '张照片')
    }
  }
}
</script>
<style lang="less">
.l-upload-card{
  .el-upload-list--picture-card .el-upload-list__item,
  .el-upload--picture-card{
    width: 80px; height: 80px;
  }
  .el-upload--picture-card{
    line-height: 80px;
  }
  .el-icon-close-tip{font-size: 0;}
  &._limit .el-upload--picture-card{
    visibility: hidden;
  }
}
</style>