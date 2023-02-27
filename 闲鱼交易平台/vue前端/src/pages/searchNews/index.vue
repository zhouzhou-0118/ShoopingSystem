<template>
  <div>
    <div class="container">
      <Nav></Nav>
      <div class="main" v-loading="loading">
        <div class="searchBar">
          <el-input
            v-model="searchMenuName"
            placeholder="请输入搜索商品名"
          ></el-input>
          <el-button
            style="margin-left: 20px"
            type="danger"
            @click="searchNews"
          >
            搜 索
          </el-button>
        </div>
        <div class="menuList">
          <div
            class="list_s1_item"
            v-for="(menu, i) in menuSearchList"
            :key="i"
          >
            <div style="cursor: pointer" @click="goNewsDetail(menu)">
              <div class="imgw">
                <img
                  :src="menu.main_image"
                  style="width: 220px; height: 280px"
                />
              </div>
              <div class="list_s1_item_info">
                <strong class="list_s1_item_info_title">{{
                  menu.title
                }}</strong>
                <span
                  style="color: #f64d36; font-weight: bold"
                  class="list_s1_item_info_sc"
                  >价格：{{ menu.price }}</span
                >
              </div>
            </div>
          </div>
        </div>
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
      searchMenuName: "",
      menuSearchList: [],
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1,
      },
      loading: false,
    };
  },
  mounted() {
    this.searchNews();
  },
  methods: {
    goNewsDetail(news) {
      this.$router.push({ path: "/newsDetail", query: { id: news.id } });
    },
    changePage(currentPage) {
      this.page.currentPage = currentPage;
      this.searchNews();
    },
    searchNews() {
      this.loading = true;
      this.$http
        .post(
          "/api/news/searchNews",
          {
            searchWord: this.searchMenuName,
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
            this.menuSearchList = resData.data;
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
  box-sizing: border-box;
}
.searchBar {
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  margin-top: 10px;
  display: flex;
}
.menuList {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-around; */
  margin-top: 20px;
}
.list_s1_item {
  width: 224px;
  height: 360px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  /* margin: 0px 20px 20px 0px; */
  display: inline-block;
  vertical-align: top;
  box-shadow: 0px 4px 12px rgb(0 0 0 / 0%);
  transition: all ease 0.3s;
  margin: 8px;
}
.list_s1_item .imgw {
  position: relative;
  height: 280px;
  overflow: hidden;
}
.list_s1_item_info {
  text-align: left;
}
.list_s1_item_info_title {
  font-size: 16px;
  color: #222;
  font-weight: 600;
  line-height: 28px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  margin: 12px 20px 0px;
}
.list_s1_item_info_sc {
  font-size: 14px;
  color: #999;
  font-weight: 400;
  line-height: 28px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  margin: 0px 20px 0px;
  padding-left: 24px;
  position: relative;
}
</style>