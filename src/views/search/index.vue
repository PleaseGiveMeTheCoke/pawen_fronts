<template>
  <div class="search">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="">
    <el-input class="searchArea"  v-model="form.name" placeholder="文件名称"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" icon="el-icon-search" @click="onSubmit">全库检索  </el-button>
  </el-form-item >
</el-form>
<el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="文件名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="typee"
        label="文件类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="size"
        label="文件大小">
        
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建日期">
        
      </el-table-column>
      <el-table-column
        prop="contributor"
        label="贡献者">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="文件概述">
        
      </el-table-column>
       <el-table-column
        prop="download"
        label="下载量"
        v-model="form.name">
        
      </el-table-column>
      <el-table-column
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleDownLoad(scope.row)">保存</el-button>
            <el-button
              size="mini"
              type="danger"
             icon="el-icon-warning"
              @click="handleReport(scope.row)">举报</el-button>
          </template>
        </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage3"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000">
    </el-pagination>
  </div>
</template>

<script>
import {getResultFiles,addDownLoad,reportFile} from '@/services/file'
export default {
   data(){
    return {
      tableData: [],
      form: {
        page:1,
        name:"",      
      }
    }
  },
   created(){
    //this.loadResultFiles()
  },
    methods: {
      onSubmit() {
        this.loadResultFiles()
      },
       handleCurrentChange(val) {
        this.form.page = val;
        this.loadPageFiles()
      },
       handleDownLoad (rowData) {
         rowData.download++;
         console.log(rowData)
         addDownLoad(rowData.fid,rowData.download)
      // 设置跳转
        window.location.href= rowData.url;
    },
   
     handleReport (rowData) {
         this.$confirm('确认举报该文件吗？', '举报提示')
        .then(async () => {
           const { data } = await reportFile(rowData.fid,this.$store.state.userId)
           if (data.code === 20000) {
            this.$message.success('举报成功')
          }
          if (data.code === 20003) {
            this.$message.warning('举报文件频繁,请十分钟后重试')
          }
        })
        .catch(() => {
          this.$message.info('已取消举报')
        })
    },
    async loadResultFiles(){
      try{
      var res = null;
      const {data} = await getResultFiles(this.form)
      if(data.code==20000&&data.message=="查询缓存成功"){
        res = data.data
        for(var i = 0;i<res.length;i++){
          res[i] = eval("("+res[i]+")")
        }

        this.tableData = res
      }else if(data.code==20000&&data.message=="查询数据库成功"){
        res = data.data
 
        this.tableData = res
      }
      }catch (err) {
      
        // 设置校验失败后的功能（提示）
         this.$message({
                        message: '操作频繁,请稍后重试',
                        type: 'warning'});
        
      }
    } 
    }
}
</script>
<style lang="scss" scoped>

</style>
