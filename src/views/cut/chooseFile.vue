<template>
  <div class="chooseFile">

       <el-table
    ref="singleTable"
    :data="tableData"
    
    style="width: 100%">
    <el-table-column
      property="name"
      label="文件名称"
      width="120">
    </el-table-column>
    <el-table-column
      property="typee"
      label="文件类型"
      width="120">
    </el-table-column>
    <el-table-column
      property="desc"
      label="文件概述">
    </el-table-column>
    <el-table-column
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button
            type="primary"
             ref="selectButton"
              size="mini"
              @click="handleCurrentChange(scope.row)">选择</el-button>

          </template>
        </el-table-column>
  </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange2"
      :current-page.sync="currentPage3"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000">
    </el-pagination>
  </div>
</template>

<script>
import {getPageFiles} from '@/services/file'
export default {
  name: 'chooseFile',
  
  data() {
     return{ 
        tableData: [],
        form: {
        pid:"",
        page: 1,
        name:"",
        desc:"",
        typee:"",
      }
     }
    },
    created(){
      this.form.pid = this.$store.state.userId
      this.loadPageFiles()
      
  },

    methods: {
      handleCurrentChange2(val) {
        this.form.page = val;
        this.loadPageFiles()
      },
        getChooseData(){
            return this.chooseData
        },
      async loadPageFiles(){
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
      
    },
      
      handleCurrentChange(val) {
          this.$emit("file",val)
          this.$refs.singleTable.setCurrentRow(val);
      },
      
    }
}
</script>

<style lang="scss" scoped></style>