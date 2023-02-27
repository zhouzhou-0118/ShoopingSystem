<template>
  <body id="poster">
    <el-form
    v-loading='loading'
      class="login-container"
      :model="registerForm"
      ref="registerForm"
      label-position="left"
      label-width="0px"
    >
      <h3 class="login_title">注册</h3>
      <el-form-item
        prop="username"
        :rules="[{ required: true, message: '用户名不能为空' }]"
      >
        <el-input
          type="text"
          v-model="registerForm.username"
          auto-complete="off"
          placeholder="请输入账号"
          ><template slot="prepend">账号：</template></el-input
        >
      </el-form-item>
      <el-form-item
        prop="nickname"
        :rules="[{ required: true, message: '昵称不能为空' }]"
      >
        <el-input
          type="text"
          v-model="registerForm.nickname"
          auto-complete="off"
          placeholder="请输入昵称"
          ><template slot="prepend">昵称：</template></el-input
        >
      </el-form-item>
      <el-form-item
      prop='phone'
      :rules="[{ required: true, message: '电话不能为空' }]">
        <el-input
          v-model="registerForm.phone"
          auto-complete="off"
          placeholder="请输入电话"
          ><template slot="prepend">电话：</template></el-input
        >
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="registerForm.address"
          auto-complete="off"
          placeholder="请输入地址"
          ><template slot="prepend">地址：</template></el-input
        >
      </el-form-item>
      <el-form-item
        prop="password"
        :rules="[{ required: true, message: '密码不能为空' }]"
      >
        <el-input
          type="password"
          v-model="registerForm.password"
          auto-complete="off"
          placeholder="请输入密码"
          ><template slot="prepend">密码：</template></el-input
        >
      </el-form-item>
      <el-form-item
        prop="password"
        :rules="[{ required: true, message: '确认密码不能为空' }]"
      >
        <el-input
          type="password"
          v-model="registerForm.confirmPassword"
          auto-complete="off"
          placeholder="请输入密码"
          ><template slot="prepend">确认密码：</template></el-input
        >
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 100%; background: #0275d8; border: none"
          @click="register"
          >注册</el-button
        >
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          size="small"
          type="text"
          style="width: 100%; color: #0275d8"
          @click="login"
          >已有账号，去登录</el-button
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
      registerForm: { //注册的用户信息
        username: "", //用户名
        nickname: "",//昵称
        password: "", //密码
        confirmPassword: "", //确认的密码
        phone: "", //手机
        address: "", //地址
        sex:"男",//性别
        avator:'#'
      },
      loading:false
    };
  },
  mounted(){
  },
  methods: {
    registerPost(data) {
      this.loading = true;
      let url = this.$api.function.register;
      this.$http.post(url,data)
      .then((res)=>{
        this.loading = false;
        const resData = res.data;
        if(resData.code == this.$api.SUCCESS){
          this.$message({
            message: resData.msg,
            type: 'success'
          });
          this.login();
        }else{
          this.$message.error(resData.msg);
        } 
      }).catch((err)=>{
        this.loading = false;
        console.log(err);
        this.$message.error('网络异常');
      })
    },
    register() {
      this.$refs["registerForm"].validate((valid) => { //校验注册的用户信息
        if (valid) { //校验的用户信息
          const {username,nickname,sex,password,phone,address,avator} = {...this.registerForm};
          if (this.registerForm.password != this.registerForm.confirmPassword) { //判断两个密码是否一致
            this.$message({
              message: "两次密码不一致，请检查！",
              type: "error",
            });
            return;
          }
          this.registerPost({username,nickname,sex,password,phone,address,avator});
        }
      });
    },
    login() {
        this.$router.push({ path: "/login" });
    },
    clear() { //清空注册数据
      this.registerForm = {
        username: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: "",
      };
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
  top: 40%;
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

