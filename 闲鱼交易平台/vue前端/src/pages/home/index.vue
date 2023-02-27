<template>
  <div>
    <div class="container">
      <Nav></Nav>
      <div class="main" v-loading="loading">
        <div class="carousel">
          <el-carousel :interval="3000" type="card" height="300px">
            <el-carousel-item v-for="(news, i) in scrollList" :key="i">
              <div @click="goNewsDetail(news)" style="height: 400px">
                <img
                  style="height: 250px; width: 400px"
                  :src="news.main_image"
                />
                <h3>{{ news.title }}</h3>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div>
          <div class="card">
            <div class="title">推荐商品</div>
            <div class="cardbody">
              <div class="sancan_item" v-for="(news, i) in scrollList" :key="i">
                <div @click="goNewsDetail(news)" style="cursor: pointer">
                  <img class="imgw" :src="news.main_image" />
                  <strong class="cardtitle">{{ news.title }}</strong>
                  <div class="des">{{ news.recommand }}</div>
                  <div class="des price">
                    <p>价格：{{ news.price }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="freshMenu">
            <div class="freshMenuTitle">所有商品</div>
            <div class="freshMenuBody">
              <div class="list_s1_item" v-for="(news, i) in newsList" :key="i">
                <div @click="goNewsDetail(news)" style="cursor: pointer">
                  <div class="imgw">
                    <img
                      :src="news.main_image"
                      style="width: 220px; height: 280px"
                    />
                  </div>
                  <div class="list_s1_item_info">
                    <strong class="list_s1_item_info_title">{{
                      news.title
                    }}</strong>
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
        </div>
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
      loading: false,
      newsList: [],
      scrollList: [],
    };
  },
  mounted() {
    this.getAllNews();
  },
  methods: {
    goNewsDetail(news) {
      this.$router.push({ path: "/newsDetail", query: { id: news.id } });
    },
    getAllNews() {
      this.loading = true;
      this.$http
        .post(
          "/api/news/getAllNews",
          {},
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
            this.scrollList = this.newsList.slice(0, 4);
          } else {
            this.$message.error(resData.msg);
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
          this.$message.error("网络异常");
        });
    },
  },
};
</script>

<style>
p {
  padding: 0;
  margin: 0;
}
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
.carousel {
  background-color: #fff;
  border-radius: 12px;
  margin-top: 10px;
}
.main {
  margin: 0 auto;
  width: 1200px;
  box-sizing: border-box;
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
.card {
  width: 1200px;
  border-radius: 12px;
  background: #fff;
  /* height: 192px; */
  padding: 20px;
  margin-top: 10px;
  box-sizing: border-box;
}
.title {
  height: 32px;
  padding: 20px 0px 20px 20px;
  font-size: 24px;
  color: #222;
  font-weight: 600;
  line-height: 32px;
  position: relative;
  text-align: left;
}
.hotList {
  padding: 0px 24px;
  font-size: 0px;
  /* height: 110px;  */
  display: flex;
  flex-wrap: wrap;
}
.hotList .word {
  display: inline-block;
  vertical-align: Top;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  color: #222;
  font-weight: 400;
  padding: 0px 16px;
  margin: 10px;
  border-radius: 20px;
  background: #f5f5f5;
}
.hotList .hot {
  background: rgba(246, 77, 54, 0.15);
  color: #f64d36;
}
.sancan_tab {
  height: 32px;
  display: inline-block;
  vertical-align: top;
  padding-left: 20px;
  font-size: 0px;
}
.sancan_tab li {
  display: inline-block;
  vertical-align: top;
  line-height: 32px;
  height: 32px;
  padding: 0px 15px;
  font-size: 18px;
  color: #fff;
  font-weight: 600;
  border-radius: 16px;
  background: #eee;
  color: #999;
  margin-right: 15px;
  cursor: pointer;
}
.sancan_tab li.current {
  background: #f64d36;
  background-image: -webkit-linear-gradient(to right, #f67536, #f64d36);
  background-image: linear-gradient(to right, #f67536, #f64d36);
  color: #fff;
}
.sancan_item {
  width: 240px;
  margin: 0px 20px 0px 0px;
  display: inline-block;
  vertical-align: top;
  position: relative;
  top: 0px;
  transition: all ease 0.3s;
}
.sancan_item .imgw {
  height: 240px;
  width: 240px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}
.cardtitle {
  font-size: 18px;
  color: #222;
  line-height: 30px;
  padding-top: 10px;
  text-align: left;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sancan_item .des {
  font-size: 14px;
  color: #999;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cardbody {
  display: flex;
  justify-content: space-around;
}
.freshMenu {
  padding: 10px;
}
.freshMenuTitle {
  text-align: left;
  height: 32px;
  padding: 20px 0px 20px 0px;
  font-size: 24px;
  color: #222;
  font-weight: 600;
  line-height: 32px;
}
.list_s1_item {
  width: 224px;
  height: 360px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  margin: 0px 5px;
  display: inline-block;
  vertical-align: top;
  box-shadow: 0px 4px 12px rgb(0 0 0 / 0%);
  transition: all ease 0.3s;
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
.freshMenuBody {
  display: flex;
  flex-wrap: wrap;
}
.price p {
  color: #f64d36;
  font-weight: bold;
}
</style>