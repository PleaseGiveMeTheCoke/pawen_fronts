<template>

  <div class="login">
        <div class="slider-area  ">
            <div class="single-sliders slider-height   d-flex align-items-center">
                <div class="container position-relative">
                    <div class="row align-items-center">
                        <div class="col-xl-5 col-lg-6 col-md-6">
                            <div class="hero-caption">
                                <h1>We provide best File solution</h1>
                                <P>A website that provides file uploading, word segmentation and crawling .</P>
                            </div>
                        </div>
         
                        <!-- hero shape 2-->
                        <div class="hero-shape">
                            <img src="./img/hero/hero-img.png" alt="">
                        </div>
                        <div class="login_area">
                                                   <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
      label-position="top"
    >
      <el-form-item
        
        label="账号"
        prop="username"
      >
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
        class="btn hero-btn"
          
          :loading="isLoginLoading"
          @click="onSubmit"
        >登录</el-button>
        <br>
        <br>
        <el-button
        class="btn hero-btn"
         
          @click="toRegister"
        >没有账号?点击注册</el-button>
      </el-form-item>
    </el-form>
                        </div>
                    </div>
                </div>
            </div> 
            
        </div>
   
  </div>
</template>

<script>
// 引入封装的接口功能组件
import "./css/bootstrap.min.css"
import "./css/style.css"
import { login } from '@/services/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      // 存储表单数据的对象
      form: {
        username: '',
        password: ''
      },
      // 用于设置表单校验规则
      rules: {
        username: [
          { required: true, message: '请输入帐号', trigger: 'blur' },
          { pattern: /^[0-9a-zA-Z]*$/g, message: '账号只包含数字或字母', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '密码长度为 6 到 18 位', trigger: 'blur' }
        ]
      },
      // 用于保存加载状态
      isLoginLoading: false
    }
  },
  methods: {
    // 登录功能
    async onSubmit () {
      try {
        await this.$refs.form.validate()
        this.isLoginLoading = true
        const { data } = await login(this.form)
        this.isLoginLoading = false
      
        if (data.code === 20000) {
          this.$message.success('登录成功')
          // 将用户信息存储到 Vuex 中
          this.$store.commit('setUser', JSON.stringify(data.data))
          // 根据可能存储的 redirect 数据进行跳转设置
         this.$router.push(this.$route.query.redirect || '/')
          console.log("=========="+JSON.stringify(this.$store.state.user))
        } else {
          this.$message.error('登录失败')
          this.$store.state.user = null;
        }
      } catch (err) {
        console.log(err)
        // 设置校验失败后的功能（提示）
        console.log('没有通过校验')
        
      }
    },
    toRegister(){
      this.$router.push('/register')
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  .login_area{
    padding-left:300px;
  }

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
