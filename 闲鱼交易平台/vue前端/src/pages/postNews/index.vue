<template>
  <div>
    <div class="container">
      <Nav></Nav>
      <div class="main" v-loading='loading'>
        <div class="formStep">
          <div>
            <el-form
            label-position="left"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
          >
            <el-form-item label="商品标题" prop="title">
              <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="商品图片" prop="mainImage">
              <div style="text-align:left">
                <el-upload
                  ref="upload"
                  action="/api/user/getFile"
                  list-type="picture-card"
                  :on-success='uploadFunction'
                  :on-remove='removeFunction'>
                  <i class="el-icon-plus"></i>
                </el-upload>
              </div>
            </el-form-item>
            <el-form-item label="商品描述" prop="article">
              <el-input
                type="textarea"
                :rows="10"
                placeholder="请输入内容"
                v-model="ruleForm.article">
              </el-input>
            </el-form-item>
            <el-form-item label="商品类型" prop="articleType">
              <el-select v-model="ruleForm.articleType" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="item in articleTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品推荐词" prop="recommand">
              <el-input v-model="ruleForm.recommand"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="price">
              <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>
          </el-form>
          <el-button style="width:100%" @click="submit" type='success'>提交</el-button>
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
      articleTypeList:[
        {
          value: '1',
          label: '娱乐'
        },
        {
          value: '2',
          label: '游戏'
        },
        {
          value: '3',
          label: '日用'
        },

        {
          value: '4',
          label: '体育'
        },
        {
          value: '5',
          label: '教育'
        },
      ],
      ruleForm: {
        title:'',
        mainImage:'',
        article:'',
        articleType:'',
        recommand:'',
        price:''
      },
      rules: {
        title: [{ required: true, message: "不能为空", trigger: "blur" }],
        article: [{ required: true, message: "不能为空", trigger: "blur" }],
        articleType: [{ required: true, message: "不能为空", trigger: "blur" }],
        recommand: [{ required: true, message: "不能为空", trigger: "blur" }],
        price: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
      loading:false
    };
  },
  computed:{
    
  },
  methods: {
    uploadFunction(response, file, fileList){
      if(response.status === '1'){
        this.ruleForm.mainImage = response.path;
      }else{
        this.$message.error(response.msg)
      }
    },

    removeFunction(){
      this.ruleForm.mainImage = '';
    },

    submit(){
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let {title,mainImage,article,articleType,recommand,price} = {...this.ruleForm};
          if(this.ruleForm.mainImage == ''){
            this.$message.error('请添加新闻图片');
            return
          }
          this.loading = true;
          this.$http.post(`/api/user/postNews`,{
            id:localStorage.testUserId,
            title,
            mainImage,
            article,
            articleType,
            price,
            recommand},
            {
              headers:{
                Authorization:localStorage.testToken
              }
            })
            .then(
              (res)=>{
              this.loading = false;
                let resData = res.data;
                if(resData.code == 1){
                  this.$message({
                    message: resData.msg,
                    type: 'success'
                  });
                  this.ruleForm = {
                    title:'',
                    mainImage:'',
                    article:'',
                    articleType:'',
                    recommand:'',
                    price:''
                  };
                  this.$refs.upload.clearFiles();
                }else{
                  this.$message.error(resData.msg);
                }
              }
            ).catch(
              (err)=>{
                this.loading = false;
                this.$message.error(err);
              }
            )
        }
      })
    }
  },
};
</script>

<style>
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
.steps {
  width: 100%;
  padding: 20px;
  margin: 10px 0;
  border-radius: 12px;
  background-color: #fff;
  box-sizing: border-box;
}
.formStep {
  margin-top: 20px;
  width: 100%;
  padding: 30px 100px;
  /* margin: 10px 0; */
  border-radius: 12px;
  background-color: #fff;
  text-align: left;
  box-sizing: border-box;
}
.percentage {
  padding: 0 110px;
}
</style>