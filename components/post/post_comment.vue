<template>
  <div class="comment">
    <h4>评论</h4>
    <el-input
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 2}"
      placeholder="说点什么吧"
      v-model="textarea"
    ></el-input>
    <el-row type="flex" class="btn">
      <el-col :span="22" class="btn_left">
        <el-upload
          action="http://127.0.0.1:1337/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :limit="10"
          name="files"
          :on-exceed="handleExceed"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-col>
      <el-col :span="2" class="btn_right">
        <el-button type="primary" size="mini" @click="postBtn">提交</el-button>
      </el-col>
    </el-row>
    <!-- 回复内容展示 -->
    <div class="comments" v-for="(v,i) in comments" :key="i">
      <p>
        地球发动机 2019-09-11 5:59
        <span>回复数</span>
      </p>
      <div>递归内容</div>
      <p class="details">本层内容</p>
      <p class="reply">
        <a href="#">回复</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea: "",
      dialogImageUrl: "",
      dialogVisible: false,
      comments: [{ conent: 33333 }]
    };
  },
  methods: {
    handleRemove(file, fileList) {
      // file为当前被你移除的图片对象
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传文件数超出
    handleExceed() {
      this.$message.error("最多允许同时上传十张图片");
    },
    handleSuccess(response, file, fileList) {
      // 获取文件上传成功之后，服务器端的文件存储路径
      console.log(response, file, fileList);
    },
    // 提交按钮
    postBtn() {
      console.log(this.textarea);
    }
  },
  mounted() {
    // this.$axios({
    //   headers: {
    //     Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
    //   },
    //   url: "/posts/comments",
    //   params: {
    //     post: 4,
    //     // _sort: "BJS",
    //     _limit: 2,
    //     _start: 0
    //   }
    // }).then(res => {
    //   console.log(res);
    // });
  }
};
</script>

<style lang="less" scoped>
.comment {
  h4 {
    font-size: 18px;
    font-weight: normal;
    margin-bottom: 20px;
  }
  .btn {
    margin: 10px 0;
  }
  .comments {
    border: 1px solid #ddd;
    padding: 20px 20px 5px;
    > p {
      font-size: 12px;
      color: #666;
    }
    .details {
      font-size: 16px;
      color: #000;
    }
    .reply {
      text-align: right;
      color: blue;
      a {
        &:hover {
          text-decoration: underline;
          color: orange;
        }
      }
    }
  }
}
</style>