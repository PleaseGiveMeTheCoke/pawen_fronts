<template>
  <div class="meun">
      <el-card class="box-card">
  <div slot="header" class="clearfix" style="display: block">
    <el-button  type="primary" @click="$router.push({
      name: 'file-add'
    })">添加文件
      
    <i class="el-icon-upload el-icon--right"></i></el-button>
    <br>
    <br>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
    
    
  
  <el-form-item  label="文件名称">
    <el-input v-model="form.name" placeholder="文件名称"></el-input>
  </el-form-item>
  <el-form-item label="文件概述">
    <el-input v-model="form.desc" placeholder="文件概述"></el-input>
  </el-form-item>
  <el-form-item label="文件类型">
    <el-select v-model="form.typee" placeholder="文件类型">
      <el-option label="音频文件" value="音频文件"></el-option>
      <el-option label="视频文件" value="视频文件"></el-option>
      <el-option label="文本文件" value="文本文件"></el-option>
      <el-option label="压缩包文件" value="压缩包文件"></el-option>
      <el-option label="图片文件" value="图片文件"></el-option>
      <el-option label="其他文件" value="其他文件"></el-option>
      <el-option label="所有文件" value=""></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查找</el-button>
  </el-form-item >
  
</el-form>

  </div>
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
        prop="ispublic"
        label="是否公开展示">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="文件概述">
        
      </el-table-column>
      <el-table-column
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleDownLoad(scope.row)">下载</el-button>
            <el-button
              size="mini"
              type="danger"
             icon="el-icon-delete"
              @click="handleDelete(scope.row)">删除</el-button>
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
</el-card>
  </div>
</template>

<script>
import {getPageFiles,deleteFile} from '@/services/file'
export default {
  name: 'MenuIndex',
  data(){
    return {
      tableData: [],
      form: {
        createTime:"",
        size:"",
        pid:"",
        name:"",
        desc:"",
        typee:"",
        page: 1,
      }
    }
  },
  created(){
    this.form.pid = this.$store.state.userId
    this.loadPageFiles()
  },
  methods:{
    onSubmit(){
      this.loadPageFiles();
    }
  ,
      handleCurrentChange(val) {
        this.form.page = val;
        this.loadPageFiles()
      },
    handleDownLoad (rowData) {
      // 设置跳转
     window.location.href= rowData.url;
    },
    handleDelete (rowData) {
      // 删除的确认提示
      this.$confirm('确认删除吗？', '删除提示')
        .then(async () => {
          // 发送删除请求
          console.log(rowData.fid+"xxxxxxxxx")
          const { data } = await deleteFile(rowData.fid)
          if (data.code === 20000) {
            this.$message.success('删除成功')
            // 更新数据列表
            this.loadPageFiles( this.form.current)
          }
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    async loadPageFiles(){
      console.log(this.form)
      var res = null;
      const {data} = await getPageFiles(this.form)
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
    }
  }
  
}
</script>

<style lang="scss" scoped></style>