<template>
  <div class="register">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px"
      label-position="top" class="demo-ruleForm">
    <el-form-item label="用户名" prop="username">
    <el-input type="primary" v-model="ruleForm.username" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="昵称" prop="nickname">
    <el-input v-model.number="ruleForm.nickname"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')" :loading="isLoginLoading">提交</el-button>
    <br>
    <br>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import { register } from '@/services/user'
export default {
    data() {
      var checkUserName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        setTimeout(() => {
          if (!this.isValid(value)) {
            callback(new Error('用户名只能由数字、字母和下划线组成'));
          } else {
            callback()
          }
        }, 1000);
      };
      var checkNickName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('昵称不能为空'));
        }
        setTimeout(() => {
          if (!this.isValid2(value)) {
            callback(new Error('用户昵称只能由数字、字母和汉字组成'));
          } else {
            callback()
          }
        }, 1000);
      };

      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        isLoginLoading: false,
        ruleForm: {
          nickname: '',
          username: '',
          pass: '',
          checkPass: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' },
            { min: 6, max: 18, message: '密码长度为 6 到 18 位', trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          username: [
            { validator: checkUserName, trigger: 'blur' }
          ],
          nickname: [
              {validator: checkNickName,trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
    isValid(str) { return /^\w+$/.test(str); },
    isValid2(str){return /^(\w|[\u4E00-\u9FA5])*$/.test(str);},
    async  submitForm(formName) {
       await this.$refs.ruleForm.validate()
       this.isLoginLoading = true
        const { data } = await register(this.ruleForm)
        this.isLoginLoading = false
        if (data.code === 20000) {
        this.$message.success('注册成功')
         this.$router.push('login')
        } else {
          this.$message.error('用户名重复')
        }

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style lang="scss" scoped>
    .register {
  height: 100vh;
  display: flex;
  // 设置内部元素垂直水平居中
  justify-content: center;
  align-items: center;

  .el-form {
    background-color: #fff;
    padding: 20px;
    width: 300px;
    border-radius: 10px;

    .el-button {
      width: 100%;
    }
  }
}
</style>
