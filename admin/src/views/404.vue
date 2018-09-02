<template>
  <div class="page-404">
    <p>404 page not found</p><br>
    <el-button type="primary" @click="$router.back()">返回上一页</el-button>
  </div>
</template>
<script>
export default {
	name: 'p404'
}
</script>
<style scoped lang="less">
.page-404 {
	padding: 4rem 0;
  font-size: 20px;
  text-align: center;
  color: rgb(192, 204, 218);
}
</style>