<template>
  <div>
    <div class="container">
      <Nav></Nav>
      <div class="main" v-loading="loading">
        <h1>{{ newsDetail.title }}</h1>
        <h4>
          <el-tag style="margin-left: 20px" effect="dark"
            >发布日期：{{ newsDetail.gmt_create }}</el-tag
          >
          <el-tag style="margin-left: 20px" effect="dark"
            >商品类型：{{ articleType }}</el-tag
          >
          <el-tag style="margin-left: 20px" effect="dark" type='warning'
            >价格：{{newsDetail.price}}</el-tag
          >
        </h4>
        <img class="image" :src="newsDetail.main_image" alt="" />
        <p class="article">{{ newsDetail.article }}</p>
      </div>
      <div class="main comments">
        <div class="postComments">
          <el-input v-model="comments" placeholder="请输入你的评论"></el-input>
          <el-button @click="postComments">评论</el-button>
          <el-button @click="postLike">点赞</el-button>
        </div>
      </div>
      <div class="main">
        <div v-if="commentsList.length === 0">暂无评论</div>
        <div
          class="commentsContainer"
          v-else
          v-for="(comment, i) in commentsList"
          :key="i"
        >
          <div class="userInfo">
            <el-avatar class="commentsAvatar" :src="comment.avator"></el-avatar>
            <div>{{ comment.userName }}</div>
            <p class="commentsContent">: {{ comment.content }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="conversation">
      <el-popover
        placement="left"
        width="750"
        trigger="click">
        <Chat></Chat>
        <el-button type="primary" slot="reference">开始聊天</el-button>
      </el-popover>
      <div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/nav";
import Chat from './chat.vue'
export default {
  components: {
    Nav,Chat
  },
  data() {
    return {
      loading: false,
      newsDetail: {
        article: "",
        article_type: "",
        artist_id: "",
        gmt_create: "",
        main_image: "",
        recommand: "",
        title: "",
        price:''
      },
      articleType: "",
      comments: "",
      commentsList: [],
      userInfoForm: {
        id: "",
        username: "",
        phone: "",
        address: "",
        sex: "",
        nickname: "",
        avator: "",
      },
      inputContent: "",
      list:['111','222'],
      inputMsg:''
    };
  },
  computed: {},
  mounted() {
    this.getNewsDetail();
    this.getComments();
    this.getUserInfo();
  },
  methods: {
    bindEnter(){

    },
    sendMessage(){

    },
    getUserInfo() {
      this.loading = true;
      this.$http
        .get(
          `/api/user/findUserInfo?id=${localStorage.testUserId}`,
          {},
          {
            Authorization: localStorage.testToken,
          }
        )
        .then((res) => {
          let resData = res.data;
          if (resData.code == 1) {
            this.$message({
              message: resData.msg,
              type: "success",
            });
            this.userInfoForm = resData.data;
          } else {
            this.$message.error(resData.msg);
          }
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error(err);
        });
    },
    postLike() {
      this.$message.success("点赞成功");
    },
    getComments() {
      this.loading = true;
      this.$http
        .post(
          "/api/news/getCommentsById",
          {
            id: this.$route.query.id,
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
            this.commentsList = resData.data;
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
    getNewsDetail() {
      this.loading = true;
      this.$http
        .post(
          "/api/news/getNewsById",
          {
            id: this.$route.query.id,
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
            this.newsDetail = resData.data[0];
            switch (this.newsDetail.article_type) {
              case "1":
                this.articleType = "娱乐";
                break;
              case "2":
                this.articleType = "游戏";
                break;
              case "3":
                this.articleType = "日用";
                break;
              case "4":
                this.articleType = "体育";
                break;
              case "5":
                this.articleType = "教育";
                break;
            }
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
    postComments() {
      let content = this.comments;
      if (content === "") {
        this.$message.error("评论不能为空");
        return;
      }
      this.comments = "";
      let artist_id = this.userInfoForm.id;
      let shop_id = this.$route.query.id;
      let avator = this.userInfoForm.avator;
      let userName = this.userInfoForm.nickname;
      this.$http
        .post(
          "/api/user/postComments",
          {
            artist_id,
            content,
            shop_id,
            avator,
            userName,
          },
          {
            headers: {
              Authorization: localStorage.testToken,
            },
          }
        )
        .then((res) => {
          let resData = res.data;
          if (resData.code == 1) {
            this.$message({
              message: resData.msg,
              type: "success",
            });
            this.getComments();
          } else {
            this.$message.error(resData.msg);
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
  },
};
</script>

<style scoped>
.postComments {
  display: flex;
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
  padding: 10px;
  box-sizing: border-box;
  background-color: #fff;
  margin-top: 10px;
}
.main .image {
  width: 800px;
  height: 600px;
}
.main .article {
  padding: 0 190px;
  text-align: left;
  text-indent: 20px;
  font-weight: bold;
  line-height: 40px;
  margin-bottom: 40px;
}
.commentsContainer {
  margin: 10px 0;
}
.commentsAvatar {
  margin-right: 10px;
}
.commentsContent {
  margin-left: 10px;
  text-align: left;
}
.userInfo {
  display: flex;
  align-items: center;
  height: 20px;
  padding: 10px;
  /* border-bottom:1px solid #eeeeee ; */
}
.conversation {
  position: fixed;
  bottom: 50%;
  right: 20px;
  /* padding: 5px; */
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 5px;
}
.conversation >>> .el-popover{
  background-color: transparent !important;
  padding: 0;
}
</style>