<template>
  <div class="nav">
        <div class="navItem">
          <el-row>
            <el-col :span="4">
              <div class="navItemHover" @click="goHome">
               <i class="el-icon-platform-eleme"></i> 首页</div>
            </el-col>
            <el-col :span="4">
              <div class="navItemHover" @click="goHealthMenu">
               <i class="el-icon-s-opportunity"></i> 商品种类</div>
            </el-col>
            <el-col :span="4">
              <div class="navItemHover" @click="goSearchMenu">
               <i class="el-icon-search"></i> 搜索商品</div>
            </el-col>
            <el-col :span="4" :offset="8">
              <div class="navItemHover">
                <i class="el-icon-s-custom"></i>
                <el-button v-if=" isLogin !=''" type='text' style="color:#fff;font-size: 17px;font-weight: bold;" @click="goInfoCenter">用户中心</el-button>
                </div>
            </el-col>
          </el-row>
        </div>
      </div>
</template>

<script>
export default {
data(){
  return{
    searchMenuWord:'',
    isLogin:'',
  }
},
mounted(){
  this.isLogin = localStorage.testToken;
},
methods: {
    goSearch() {
      alert("店家时间");
    },
    goMenuSort() {
      this.$router.push({path:'/menuSort'});
    },
    goHome() {
        this.$router.push({path:'/'});
    },
    goHealthMenu() {
        this.$router.push({path:'/newsSort'});
    },
    goLogin() {
        this.$router.push({path:'/login'});
    },
    goRegister() {
        this.$router.push({path:'/register'});
    },
    goSearchMenu() {
      this.$router.push({path:'/searchNews'});
    },
    logout() {
      localStorage.testToken = '';
      this.goLogin();
    },
    goInfoCenter(){
      this.$router.push({path:'/infoCenter'});
    }
  },
}
</script>

<style scoped>
.nav {
  height: 80px;
  line-height: 80px;
  width: 100%;
  background-color: #409EFF;
  color: #fff;
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 99;
}
.navItem {
  height: 80px;
  width: 1200px;
  font-size: 17px;
  font-weight: bold;
  box-sizing: border-box;
}
.navItemHover:hover {
  background-color: #3e9af7;
}
.navItemHover {
  width: 100%;
  cursor: pointer;
}
</style>