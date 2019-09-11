<template>
  <div class="detail">
    <el-row type="flex" class="row-bg">
      <!-- left -->
      <el-col :span="17" class="left">
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
          <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 文章详情 -->
        <h1>{{detail.title}}</h1>
        <hr />
        <p>攻略：{{detail.created_at}} 阅读：{{detail.watch}}</p>
        <!-- 后台返回的文章数据 -->
        <div v-html="html"></div>
        <!-- 点赞收藏 -->
        <el-row type="flex" class="praise">
          <el-col :span="6">
            <a href="#">
              <i class="iconfont iconpinglun"></i>
              <p>评论(0)</p>
            </a>
          </el-col>
          <el-col :span="6">
            <a href="#">
              <i class="iconfont iconstar1"></i>
              <p>收藏</p>
            </a>
          </el-col>
          <el-col :span="6">
            <a href="#">
              <i class="iconfont iconfenxiang"></i>
              <p>分享</p>
            </a>
          </el-col>
          <el-col :span="6">
            <a href="#">
              <i class="iconfont iconding"></i>
              <p>点赞(0)</p>
            </a>
          </el-col>
        </el-row>
        <!-- 评论 -->
        <postCommit></postCommit>
      </el-col>
      <el-col :span="7" class="right">
        <h4>相关攻略</h4>
        <hr />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import postCommit from "@/components/post/post_comment";
export default {
  components: {
    postCommit
  },
  data() {
    return {
      html: "",
      detail: ""
    };
  },
  methods: {},
  mounted() {
    // 文章详情
    this.$axios({
      url: "/posts",
      params: {
        id: this.$route.query.id
      }
    }).then(res => {
      // console.log(res.data.data);
      // console.log(this.$route.query.id);
      this.html = res.data.data[0].content;
      this.detail = res.data.data[0];
    });
  }
};
</script>

<style lang="less" scope>
.detail {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
  .left {
    // background-color: pink;
    padding-right: 20px;
    h1 {
      padding: 20px 0;
      // font-size: 20px;
    }
    > p {
      padding: 20px;
      text-align: right;
    }
    div {
      p {
        overflow: hidden;
        span {
          img {
            width: 100%;
            margin-bottom: 10px 0;
          }
          float: right;
        }
      }
    }
    .praise {
      width: 60%;
      margin: 0 auto;
      padding: 30px 0;
      text-align: center;
      i {
        font-size: 26px;
        color: orange;
      }
      p {
        padding-top: 5px;
      }
    }
  }
  .right {
    background-color: aqua;
    h4 {
      font-size: 18px;
      font-weight: normal;
      padding-bottom: 10px;
    }
  }
}
</style>