<template>
  <div id="app">
    <div id="nav">
      <!-- 根路由出口 -->
    </div>
    <router-view/>
  </div>
</template>
<script>
import request from '@/utils/request'
request({
  method: 'GET',
  url: 'http://edufront.lagou.com/front/ad/getAdList'
}).then(res => {
  console.log(res)
})
export default ({

})

</script>



<style lang="scss">
.el-table--striped .el-table__body tr.el-table__row--striped.current-row td, .el-table__body tr.current-row>td {
    color: #fff;
    background-color: #a2a4a7!important;
}

</style>
