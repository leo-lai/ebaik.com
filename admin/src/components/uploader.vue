<template>
  <div class="l-uploader">
    <el-upload class="l-upload-card" name="image" accept="image/*" list-type="picture-card" multiple 
               :data="formData"
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
      <div v-if="fileNum < limit" slot="trigger">
        <div class="_tip-imgs" v-if="fileNum === 0" @click.stop>
          <image-previewer :file-list="images"></image-previewer>
        </div>
        <div class="_tip-txt">
          <div class="_slot" @click.stop>
            <slot>
              <p>{{tip}}</p>
              <p>支持JPG/PNG格式</p>
            </slot>
          </div>
          <a class="_slt">选择文件</a>
        </div>
      </div>
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
    samplePic: {
      type: Array,
      default() {
        return []
      }
    },
    limit: {
      type: Number,
      default: 50
    },
    tip: {
      type: String,
      default: '示例图'
    }
  },
  data() {
    return {
      formData: {},
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
  },
  mounted() {
    this.formData.timestamp = Date.now()
    this.formData.sign = this.$api.md5(this.$utils.sign(this.formData))
  }
}
</script>
<style lang="less">
.l-uploader{ display: inline-block; vertical-align: top; line-height: 1.6; }
.l-upload-card{
  .el-upload-list__item{
    width: 80px; height: 80px; border-radius: 0; transition: none; vertical-align: top;
  }
  .el-icon-close-tip{font-size: 0;}
  &._limit .el-upload--picture-card{
    visibility: hidden;
  }
  .el-upload--picture-card{
    line-height: 1.6; text-align: left; color: #999;width: auto; height: auto; font-size: 12px;
    border-color: transparent; background-color: transparent; 
    ._slt{ display: inline-block; padding: 3px 12px; color: #fff; background-color: #5b7fc1; }
    ._tip-imgs{
      display: inline-block; vertical-align: top; filter: grayscale(100);
      img{
        width: 80px; height: 80px; margin: 0 8px 8px 0; border:1px solid #c0ccda; vertical-align: top;
      }
    }
    ._slot{cursor: default; height: 55px;}
    ._tip-txt{
      display: inline-block; vertical-align: top; margin-left: 10px;
    }
  }
}
</style>