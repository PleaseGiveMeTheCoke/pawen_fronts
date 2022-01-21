<template>
  <div class="file-add">
      <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>添加文件</span>
    
  </div>
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="文件名称" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
    
    
        <el-form-item label="是否公开">
            <el-switch v-model="form.ispublic"></el-switch>
        </el-form-item>
          <el-alert
    title="注:    目前文本文件只支持txt类型"
    type="warning">
  </el-alert>
        <el-form-item label="文件类型" prop="type">
        
            <el-radio-group v-model="form.type">
            <el-radio label="音频文件"></el-radio>
            <el-radio label="视频文件"></el-radio>
            <el-radio label="文本文件"></el-radio>
            <el-radio label="压缩包文件"></el-radio>
            <el-radio label="图片文件"></el-radio>
            <el-radio label="其他文件"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="文件描述">
            <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 15, maxRows: 15}" resize='none'></el-input>
        </el-form-item>
        <el-form-item>
            <el-upload
            :on-change="handleChange"
            :before-remove="beforeRemove"
             :data="upData"
              ref="upload"
              :auto-upload="false"
              class="upload-demo"
              drag
              action='http://localhost:7788/Gsave/file/readFile'
              :http-request= readFileHandler
              :files="fileList">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip"></div>
            </el-upload> 
        </el-form-item>
        <br>
        <br>
        <el-form-item>
            <el-button type="primary" @click="onSubmit" :loading="isLoginLoading">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
        </el-form>
        
</el-card>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
    name:'FileAdd',
     data() {
       var checkName = (rule, value, callback) => {
        if (!value) {
              this.$message({
             message: '文件名称不能为空',
             type: 'warning'
          });
          return callback(new Error('文件名称不能为空'));
        }
        setTimeout(() => {
          if (!this.isValid2(value)) {
                this.$message({
             message: '文件名称只能由数字、字母和汉字组成',
             type: 'warning'
          });
            callback(new Error('文件名称只能由数字、字母和汉字组成'));
          } else {
            callback()
          }
        }, 1000);
      };
       var checkType = (rule, value, callback) => {
        if (!value) {
              this.$message({
             message: '请选择文件类型',
             type: 'warning'
          });
          return callback(new Error('请选择文件类型'));
        }
         callback();
      };
      return {
        form: {
          name: '',
          ispublic: false,
          type: '',
          desc: ''
        },
        file:null,
        isAdd:false,
        fileList: [],
        rules: {
        type: [
           { validator:checkType, trigger: 'blur' }
          
        ],
        name: [
          { validator:checkName, trigger: 'blur' }
        ]
      },
      isLoginLoading: false
      }
    },
    computed:{
       upData: function() {
                return this.form
            }
    },
    methods: {
      handleChange(file, fileList) {

        console.log(this.file)
        this.fileList.push(file);
        this.isAdd = true;
      },
       beforeRemove(file,fileList) {
      
        this.fileList.pop();
        this.isAdd = false;
      },
      isValid2(str){return /^(\w|[\u4E00-\u9FA5])*$/.test(str);},
      async   readFileHandler(file){
        
        console.log(file)
        this.isLoginLoading = true  
        if(!this.judgeFile(file.file.name,this.form.type)){
             
             this.isLoginLoading = false
               this.$message({
             message: '上传文件与所选类型不匹配',
             type: 'warning'});
              window.setTimeout(function () {undefined
             window.location.reload();
      },500)
             return;
        }
        
        var formData = new FormData();
       
        formData.append("file",file.file)
        formData.append("name",this.form.name)
        formData.append("ispublic",this.form.ispublic)
        formData.append("type",this.form.type)
        formData.append("desc",this.form.desc)
        formData.append("pid",this.$store.state.userId)
        formData.append("time",file.file.lastModifiedDate)
        formData.append("size",file.file.size)
        
        console.log(file.file);
        
        this.isLoginLoading = true
       await request({
        method: 'post',
        url: 'http://localhost:7788/Gsave/file/uploadFile',
        data: formData
        }).then(res => {
           
          if(res.data.code==20000){
            this.$message.success("添加文件成功")
            this.$router.push({
              name:'file'
            })
          }
          
         })
        this.isLoginLoading = false
      },
      judgeFile(name,type){
        name = name.toLowerCase()
        if(type=="音频文件"){
          return name.endsWith("mid")||name.endsWith("wav")||name.endsWith("mp1")||name.endsWith("mp2")||name.endsWith("mp3")||name.endsWith("mp4")||name.endsWith("aif")
        }else if(type=="视频文件"){
          return name.endsWith("mp4")||name.endsWith("avi")||name.endsWith("mov")||name.endsWith("asf")||name.endsWith("rm")||name.endsWith("navi")||name.endsWith("mpg")
        }else if(type=="文本文件"){
          return name.endsWith("txt")
        }else if(type=="压缩包文件"){
          return name.endsWith("rar")||name.endsWith("zip")||name.endsWith("jar")||name.endsWith("war")||name.endsWith("arj")||name.endsWith("tar")||name.endsWith("gz")
        }else if(type=="图片文件"){
           return name.endsWith("bmp")||name.endsWith("gif")||name.endsWith("jpg")||name.endsWith("png")
        }else if(type=="其他文件"){
          return true;
        }
      },
      onSubmit() {
     
        this.isLoginLoading = true
          this.$refs.form.validate((valid) => {
                    if (valid) {
                        //触发组件的action
                        console.log(this.isAdd)
                        if(this.fileList.length==0&&!this.isAdd){
                          this.isLoginLoading = false;
                          this.$message({
                        message: '未选择文件',
                        type: 'warning'});
                        }
                        console.log("yyyyyyyy")
                        this.$refs.upload.submit();
                        //this.readFileHandler(this.file)
                    } else {
                      this.isLoginLoading = false;
                        console.log('error submit!!');
                        return false;
                    }
                });
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
     
    }
    

}
</script>

<style>

</style>