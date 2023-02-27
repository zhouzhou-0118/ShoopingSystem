<template>
  <div>
    <div class="container">
      <Nav></Nav>
      <div class="main" v-loading="loading">
        <div class="mainNav">
          <el-menu
            style="border: none"
            background-color="#fff"
            text-color="#333"
            active-text-color="#F56C6C"
            @select="sortNews"
          >
            <el-submenu index="0">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品类别</span>
              </template>
              <el-menu-item index="1">
                <i class="el-icon-headset"></i>
                <span slot="title">娱乐</span>
              </el-menu-item>
              <el-menu-item index="2">
                <i class="el-icon-place"></i>
                <span slot="title">游戏</span>
              </el-menu-item>
              <el-menu-item index="3">
                <i class="el-icon-office-building"></i>
                <span slot="title">日用</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-basketball"></i>
                <span slot="title">体育</span>
              </el-menu-item>
              <el-menu-item index="5">
                <i class="el-icon-document"></i>
                <span slot="title">教育</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
        <div class="menu">
          <div class="list_title">商品类别</div>
          <div class="list_s2_content">
            <div class="list_s2_item" v-for="(news, i) in newsList" :key="i">
              <div style="cursor: pointer" @click="goNewsDetail(news)">
                <div class="imgw">
                  <img class="list_s2_item_img" :src="news.main_image" />
                </div>
                <div class="list_s2_item_info">
                  <strong>{{ news.title }}</strong>
                  <span
                    style="color: #f64d36; font-weight: bold"
                    class="list_s1_item_info_sc"
                    >价格：{{ news.price }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="side">
          <div class="right_item_s1">
            <div class="title_s2">热门商品类型</div>
            <ul>
              <li @click="sortNews('1')">
                <a>娱乐</a>
              </li>
              <li @click="sortNews('2')">
                <a>游戏</a>
              </li>
              <li @click="sortNews('3')">
                <a>日用</a>
              </li>
              <li @click="sortNews('4')">
                <a>体育</a>
              </li>
              <li @click="sortNews('5')">
                <a>教育</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="page">
        <el-pagination
          background
          layout="total,prev, pager, next"
          :total="page.total"
          :page-size="page.pageSize"
          :current-page="page.currentPage"
          @current-change="changePage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/nav";
export default {
  components: {
    Nav,
  },
  data() {
    return {
      newsList: [],
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1,
      },
      loading: false,
      articleType: "",
    };
  },
  methods: {
    goNewsDetail(news) {
      this.$router.push({ path: "/newsDetail", query: { id: news.id } });
    },
    changePage(currentPage) {
      this.page.currentPage = currentPage;
      this.sortNews();
    },
    sortNews(index) {
      if (index) {
        this.articleType = index;
      }
      this.loading = true;
      this.$http
        .post(
          "/api/news/getRecommendNews",
          {
            article_type: this.articleType,
            pageSize: this.page.pageSize,
            currentPage: this.page.currentPage,
          },
          {
            headers: {
              Authorization: localStorage.testToken,
            },
          }
        )
        .then((res) => {
          this.loading = false;
          let resData = res.data;
          if (resData.code == 1) {
            this.$message({
              message: resData.msg,
              type: "success",
            });
            this.newsList = resData.data;
            this.page = {
              total: resData.total,
              pageSize: resData.pageSize,
              currentPage: resData.currentPage,
            };
          } else {
            this.$message.error(resData.msg);
          }
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error(err);
        });
    },
  },
};
</script>

<style scoped>
ol,
ul {
  list-style: none;
}
a {
  text-decoration: none;
}
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

.main {
  margin: 0 auto;
  width: 1200px;
  display: flex;
}
.mainNav {
  width: 220px;
  min-width: 220px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 12px;
  text-align: left;
  margin-top: 20px;
  height: 800px;
  padding: 10px;
}
.body {
  padding: 0 400px;
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  /* justify-content: space-between; */
}
.list_title {
  height: 40px;
  font-size: 32px;
  color: #222;
  font-weight: 600;
  line-height: 40px;
  padding: 0px 0px 12px;
}
.menu {
  width: 800px;
  /* box-sizing: border-box; */
  padding-top: 20px;
  padding-right: 10px;
  padding-left: 30px;
  text-align: left;
}
.list_sort {
  display: flex;
  color: #666;
  margin-bottom: 20px;
}
.list_sort span {
  margin-right: 10px;
}
.list_s2_item {
  width: 224px;
  height: 360px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  margin: 0px 20px 20px 0px;
  display: inline-block;
  vertical-align: top;
  box-shadow: 0px 4px 12px rgb(0 0 0 / 0%);
  transition: all ease 0.3s;
}
.list_s2_item .imgw {
  position: relative;
  height: 280px;
  overflow: hidden;
}
.list_s2_item_img {
  height: 280px;
  display: block;
}
.list_s2_item_info {
  display: block;
  height: 80px;
}
.list_s2_item_info strong {
  margin: 10px;
  color: #222;
}
.list_s2_item_info div {
  margin: 10px;
  color: #909399;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.right_item_s1 {
  margin-top: 20px;
  width: 200px;
  margin-bottom: 40px;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}
.title_s2 {
  height: 32px;
  padding: 20px 0px 20px 20px;
  font-size: 24px;
  color: #222;
  font-weight: 600;
  line-height: 32px;
  position: relative;
}
.right_item_s1 ul {
  font-size: 0px;
  padding: 0px 20px 14px;
}
.right_item_s1 ul li {
  margin: 0px 10px 10px 0px;
  display: inline-block;
  cursor: pointer;
  vertical-align: top;
}
.right_item_s1 ul li a {
  border-radius: 4px;
  display: inline-block;
  padding: 0px 10px;
  height: 36px;
  line-height: 36px;
  font-weight: 400;
  color: #666;
  transition: all ease 0.3s;
  font-size: 16px;
  background: #f5f5f5;
}
.page {
  margin-bottom: 20px;
}
</style>