<template>
  <div class="page-403">
    <p>403 forbidden</p><br>
    <el-button type="primary" @click="$router.back()">返回上一页</el-button>
  </div>
</template>
<script>
export default {
	name: 'p403'
}
</script>
<style scoped lang="less">
.page-403 {
	padding: 4rem 0;
  font-size: 20px;
  text-align: center;
  color: rgb(192, 204, 218);
}
</style>