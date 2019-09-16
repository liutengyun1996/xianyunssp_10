<template>
  <div class="comment">
    <el-tag
      :key="tag.id"
      v-for="tag in dynamicTags"
      closable
      :type="tag.type"
      @close="handleClose(tag)"
    >{{tag.name}}</el-tag>
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
      <!-- <p>
        地球发动机 2019-09-11 5:59
        <span>回复数</span>
      </p>
      <div>递归内容</div>
      <p class="details">本层内容</p>
      <p class="reply">
        <a href="#">回复</a>
      </p>-->
      <item :data="remark"></item>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import item from "@/components/post/detail_item";
export default {
  components: {
    item
  },
  data() {
    return {
      textarea: "",
      dialogImageUrl: "",
      dialogVisible: false,
      comments: [{ conent: 33333 }],
      //递归需要的变量
      //请求评论接口需要上传的对象
      air: {
        post: 4, //文章id
        //_sort:"", //排序
        _limit: 2, //条数
        _start: 0 //开始数据(分页)
      },
      //评论需要的数据
      remark: [],
      //分页需要的数据
      currentPage: 1, //当前页数
      pageSize: 2, //一页显示的条数
      total: 100, //总条数
      //可以除标签的数据
      dynamicTags: [],
      fileList: []
    };
  },
  methods: {
    handleClose(tag) {
      console.log(tag);
      //可移除标签的点击关闭事件
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
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
      //fileList 吧这个放到vuex  然后去获取
      // console.log(fileList)
      // this.$store.commit('post/setPics',fileList)
      // console.log(this.$store.state.post.pics)
      console.log(response, file, fileList);
    },
    // 提交按钮
    postBtn() {
      // console.log(this.textarea);
      //收集数据
      console.log(this.$route.query.id);
      var data = {
        content: this.textarea,
        follow: this.$store.state.post.dynamicTags.id,
        post: this.$route.query.id,
        pics: this.fileList
      };
      // console.log(this.$store.state.post.dynamicTags)
      this.$axios({
        url: "http://157.122.54.189:9095/comments",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`,
          'Content-Type':'application/json;charset=UTF-8'
        }
      }).then((res)=>{
        console.log(res)
      })
    },

    //切换一页显示多少条
    handleSizeChange(val) {
      // console.log(val)
      this.pageSize = val;
      this.air._limit = this.pageSize;
      this.init();
    },
    //切换现在是第几页
    handleCurrentChange(val) {
      // console.log(val)
      this.currentPage = val;
      this.air._start = this.currentPage;
      this.init();
    },
    //评论数据初始化
    init() {
      this.$axios({
        url: "http://157.122.54.189:9095/posts/comments",
        params: this.air
      }).then(res => {
        //   console.log(res);
        this.remark = res.data.data;
        //console.log(this.remark)
      });
    }
  },
  mounted() {
    this.init();
    //预留一个位置 这里组件加载完成后 要  用vuex修改dynamicTags 这个数据的值
    //setInterval 永久性定时器  setTimeout一次性定时器
    // setInterval(()=>{
    //   // console.log(124)
    //   // console.log(this.$store.state.post.dynamicTags)
    //   this.dynamicTags = this.$store.state.post.dynamicTags
    // },1000)
  },
  watch: {
    "$store.state.post.dynamicTags"(newVal, oldVal) {
      this.dynamicTags = [];
      this.dynamicTags.push(this.$store.state.post.dynamicTags);
    }
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