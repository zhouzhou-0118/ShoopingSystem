<template>
  <body id="poster">
    <el-form
      :model="loginForm"
      v-loading="loading"
      ref="loginForm"
      class="login-container"
      label-position="top"
      label-width="0px"
    >
      <h3 class="login_title">登录</h3>
      <el-form-item
        prop="username"
        :rules="[{ required: true, message: '用户名不能为空' }]"
      >
        <el-input
          type="text"
          v-model="loginForm.username"
          auto-complete="off"
          placeholder="请输入账号"
          ><template slot="prepend">账号：</template></el-input
        >
      </el-form-item>
      <el-form-item
        prop="password"
        :rules="[{ required: true, message: '密码不能为空' }]"
      >
        <el-input
          type="password"
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="请输入密码"
          ><template slot="prepend">密码：</template></el-input
        >
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 100%; background: #0275d8; border: none"
          @click="login"
          >登录</el-button
        >
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          size="small"
          type="text"
          style="width: 100%; color: #0275d8"
          @click="register"
          >没有账号，去注册</el-button
        >
      </el-form-item>
    </el-form>
  </body>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: { //登录的用户信息
        username: "", //用户名
        password: "", //密码
      },
      loading:false
    };
  },
  methods: {
    loginPost(data){
      this.loading = true;
      let url = this.$api.function.login;
      this.$http.post(url,data)
      .then(
        (res)=>{
          let resData = res.data;
          if(resData.code == this.$api.SUCCESS){
            this.$message({
              message: resData.msg,
              type: 'success'
            });
            localStorage.testToken = resData.data.token;
            localStorage.testUserId = resData.data.id;
            this.$cookie.set("token", resData.data.token, "0", "/");
            console.log(this.$cookies.get('token'));
            this.$router.push({ path: "/" });
          }else{
            this.$message.error(resData.msg);
          }
          this.loading = false;
        }
      ).catch(
        (err)=>{
          console.log(err);
          this.$message.error('网络异常');
          this.loading = false;
        }
      )
    },
    login() {
      this.$refs["loginForm"].validate((valid) => { //校验用户名和密码数据
        //校验用户名和密码是否为空
        if (valid) {
          this.loginPost({
            username:this.loginForm.username,
            password:this.loginForm.password,
          })
        }
      });
    },
    register() {
      this.$router.push({ path: "/register" });
    },
    clear() {
      //清除登录信息
      this.loginForm.username = "";
      this.loginForm.password = "";
    },
  },
};
</script>

<style>
#poster {
  background-image: url(https://static.zhihu.com/heifetz/assets/sign_bg.db29b0fb.png);
  background-repeat: no-repeat;
  background-color: #b8e5f8;
  background-size: cover;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
body {
  margin: 0px;
}
.login-container {
  width: 480px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background:#00000090;
  text-align: center;
  border-radius: 20px;
  margin-top: 10px;
}


.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>

