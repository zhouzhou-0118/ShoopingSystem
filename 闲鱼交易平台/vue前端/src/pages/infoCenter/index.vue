<template>
  <div>
    <div class="container">
      <Nav></Nav>
      <div class="main" v-loading="loading">
        <div class="main-top">
          <div class="logo-nav">
            <el-avatar :src="userInfoForm.avator" :size='100'  ></el-avatar>
            <div class="name">{{userInfoForm.nickname}}</div>
            <el-menu
              style="width: 100%;border:none"
              background-color="#fff"
              text-color="#333"
              active-text-color="#409EFF"
              @select='changeNav'
            >
              <el-menu-item index="1">
                <i class="el-icon-location"></i>
                <span slot="title"> 个人资料</span>
              </el-menu-item>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">已发布商品</span>
              </el-menu-item>
            </el-menu>
          </div>
          <div class="info">
            <div v-if="activeIndex == 1">
              <el-descriptions  title="用户信息" :column="3">
                <template slot="extra">
                  <el-button type="success" size="small" @click="postNews">发布商品</el-button>
                  <el-button type="primary" size="small" @click="changeInfo">修改用户信息</el-button>
                  <el-button type="danger" size="small" @click="logout">退出登录</el-button>
                </template>
                <el-descriptions-item label="用户名">{{userInfoForm.username}}</el-descriptions-item>
                <el-descriptions-item label="昵称">{{userInfoForm.nickname}}</el-descriptions-item>
                <el-descriptions-item label="手机号">{{userInfoForm.phone}}</el-descriptions-item>
                <el-descriptions-item label="居住地">{{userInfoForm.address}}</el-descriptions-item>
                <el-descriptions-item label="性别">
                  <el-tag size="small">{{userInfoForm.sex}}</el-tag>
                </el-descriptions-item>
              </el-descriptions>
            </div>
            <div v-if="activeIndex == 2">
              <div style="font-size:16px;font-weight:700;margin-bottom:20px;text-align:left">已发布商品</div>
              <div v-for="(news,i) in newsList" :key='i'>
                <div class="menu" @click="goNewsDetail(news)">
                  <el-avatar shape="square" :size="160" fit="cover" :src="news.main_image"></el-avatar>
                  <div class="info">
                    <div style="font-size:14px;">标题：{{news.title}}</div>
                    <div style="font-size:14px;" class="desc">创建时间：{{news.gmt_create}}</div>
                    <div style="font-size:14px;">商品类型：{{news.article_type}}</div>
                    <div style="font-size:14px;">推荐词：{{news.recommand}}</div>
                    <div style="font-size:14px;">价格：{{news.price}}</div>
                  </div>
                </div>
                <el-divider ></el-divider>
              </div>   
            </div>
          </div>
        </div>
        <div>

        </div>
      </div>
      <el-dialog
        title="修改用户信息"
        :visible.sync="isChangeUserInfo">
        <el-form :model="userInfoForm" :rules="rules" ref="userInfoForm" label-width="100px" >
          <el-form-item label="用户名" prop="username">
            <el-input readonly v-model="userInfoForm.username"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="userInfoForm.nickname"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="phone">
            <el-input v-model="userInfoForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-input v-model="userInfoForm.sex"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="userInfoForm.address"></el-input>
          </el-form-item>
          <el-form-item label="头像上传">
            <div style="text-align:left">
              <el-upload
              action="/api/user/getFile"
              list-type="picture-card"
              :on-success='uploadFunction'
              :on-remove='removeFunction'>
              <i class="el-icon-plus"></i>
            </el-upload>
            </div>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isChangeUserInfo = false">取 消</el-button>
          <el-button type="primary" @click="confirmChange">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/nav'
export default {
  components:{
    Nav
  },
  data(){
    return{
      activeIndex:1,
      isChangeUserInfo:false,
      userInfoForm:{
        id:'',
        username:'',
        phone:'',
        address:'',
        sex:'',
        nickname:'',
        avator:''
      },
      rules: {
        username: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        phone: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        address: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        sex: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        nickname: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
      },
      loading:false,
      newsList:[]
    }
  },
  mounted(){
    this.getUserInfo();
  },
  methods:{
    goNewsDetail(news){
      this.$router.push({path:'/newsDetail',query:{id:news.id}});
    },
    uploadFunction(response, file, fileList){
      if(response.status === '1'){
        this.userInfoForm.avator = response.path;
      }else{
        this.$message.error(response.msg)
      }
    },
    removeFunction(){
      this.userInfoForm.avator = '';
    },
    getUserInfo(){
      this.loading = true;
      this.$http.get(`/api/user/findUserInfo?id=${localStorage.testUserId}`,{},
      {
          Authorization:localStorage.testToken
      })
      .then(
        (res)=>{
          let resData = res.data;
          if(resData.code == 1){
            this.$message({
              message: resData.msg,
              type: 'success'
            });
            this.userInfoForm = resData.data;
          }else{
            this.$message.error(resData.msg);
          }
          this.loading = false;
        }
      ).catch(
        (err)=>{
          this.loading = false;
          this.$message.error(err);
        }
      )
    },
    confirmChange(){
      let {id,username,nickname,avator,sex,address,phone} = {...this.userInfoForm}
        this.$refs['userInfoForm'].validate((valid) => {
          if (valid) {
            this.$http.post(`/api/user/updateUserInfo`,{id,username,nickname,avator,sex,address,phone},
            {
              headers:{
                Authorization:localStorage.testToken
              }
            })
            .then(
              (res)=>{
                let resData = res.data;
                if(resData.code == 1){
                  this.$message({
                    message: resData.msg,
                    type: 'success'
                  });
                  this.getUserInfo();
                }else{
                  this.$message.error(resData.msg);
                }
              }
            ).catch(
              (err)=>{
                this.$message.error(err);
              }
            )
            this.isChangeUserInfo = false;
          }
        })
    },
    changeInfo(){
      this.isChangeUserInfo = true;
    },
    getUserNews(){
      let {id} = {...this.userInfoForm};
      this.$http.post(`/api/user/getUserNews`,{id},
            {
              headers:{
                Authorization:localStorage.testToken
              }
            })
            .then(
              (res)=>{
                let resData = res.data;
                if(resData.code == 1){
                  this.$message({
                    message: resData.msg,
                    type: 'success'
                  });
                  console.log(resData);
                  this.newsList = resData.data;
                }else{
                  this.$message.error(resData.msg);
                }
              }
            ).catch(
              (err)=>{
                this.$message.error(err);
              }
            )
    },
    changeNav(index){
      this.activeIndex = index;
      if(index == '2'){
        this.getUserNews();
      }
    },
    logout(){
      localStorage.testToken = '';
      localStorage.testUserId = '';
      this.$router.push({ path: "/login" });
    },
    postNews(){
      this.$router.push({ path: "/postNews" });
    }
  }
};
</script>

<style scoped>
.container {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f1f1f1;
  overflow: auto;
}
.main{
  width: 1200px;
  box-sizing: border-box;
  padding: 20px;
  margin: 10px auto 0;
  border-radius: 12px;
  background-color: #fff;
}
.main-top{
  display: flex;
}
.logo-nav{
  width: 200px;
  min-width: 200px;
  border-right: 2px solid #f1f1f1;
  text-align: center;
  padding: 10px;
  padding-right: 20px;
  box-sizing: border-box;
}
.logo-nav .name{
  font-size: 20;
  font-weight: bold;
  margin: 10px;
}
.main-top .info{
  padding: 10px 20px;
}
.menu{
  display: flex;
  height: 160px;
  padding: 10px;
  text-align: left;
  width: 900px;
  cursor: pointer;
}
.menu .info{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>