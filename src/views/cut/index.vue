<template>
  <div class="cut">
  <el-steps :active="active" finish-status="success">
    <el-step title="选择文本文件"></el-step>
    <el-step title="添加标注标签"></el-step>
    <el-step title="标注相关信息"></el-step>
</el-steps>
<br>
  <router-view @tags="getTags" @file="getFile" @end="end"></router-view>
  
  <!-- <div style="margin-top: 20px">
    <el-button @click="setCurrent(tableData[1])">选中第二行</el-button>
    <el-button @click="setCurrent()">取消选择</el-button>
  </div> -->
<el-button style="margin-top: 12px;" @click="next">下一步</el-button>
</div>
</template>

<script>
export default {
  name: 'CutIndex',
  data() {
      return {
        active: 0,
        currentRow: null,
        file:null,
        tags:null
      };
    },
    created(){
      this.$router.push({
              name:'chooseFile'
            }).catch(err => { console.log(err) })

  },

    methods: {
      getFile(data){
          this.file = data
          
      },
      end(data){
          this.active = 0;
          this.currentRow=null,
          this.file=null,
          this.tags=null
      },
      getTags(data){
          this.tags = data
          
      },
      next() {
        
        if(this.active==0){
          if(this.file==null||this.file.typee!="文本文件"){
              
             this.$message({
             message: '请选择一个txt类型的文件',
             type: 'warning'
          });
          }
          else{
            console.log(this.file);
            console.log(this.active);
              this.active++;
              this.$router.push({
              name:'addTag'
            }).catch(err => { console.log(err) })

          }
        }
        else if(this.active==1){
           this.active++;
          this.$router.push({
              name:'sign',
              params:{
                file: this.file,
                tags: this.tags
              }
            }).catch(err => { console.log(err) })

        }else if(this.active==2){
           this.active = 0;
           this.currentRow=null,
          this.file=null,
          this.tags=null
           this.$router.push({
              name:'chooseFile'
            }).catch(err => { console.log(err) })
        }
      }
    }
}
</script>
<style lang="scss" scoped></style>


