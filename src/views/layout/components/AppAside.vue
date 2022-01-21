<template>
  <div class="app-aside">
      <el-menu
        router                
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        >
       <el-menu-item index="cut">
          <i class="el-icon-s-grid"></i>
          <span slot="title">分词系统</span>
        </el-menu-item>
        <el-menu-item index="/file">
          <i class="el-icon-document"></i>
          <span slot="title">我的文件</span>
        </el-menu-item>
        
        
        <el-menu-item index="search">
          <i class="el-icon-search"></i>
          <span slot="title">文件检索</span>
        </el-menu-item>
    </el-menu> 
  </div>
</template>

<script>
export default {
    name: 'AppAside'
}
</script>

<style lang="scss" scoped>
  .app-aside{
  height: 100%;
  .el-menu{
    height: 100%;
    border-right: 0 none;
  }
}
</style>