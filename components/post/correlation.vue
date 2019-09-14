<template>
  <div class="correlation">
    <el-row
      type="flex"
      justify="space-between"
      class="content"
      v-for="(v,i) in content.slice(-5)"
      :key="i"
    >
      <div class="content_left">
        <a @click="detail(v.id)">
          <img :src="`${v.images[0]}`" alt />
        </a>
      </div>
      <div class="content_right">
        <p class="content_top">
          <a @click="detail(v.id)">{{v.title}}</a>
        </p>
        <el-row>
          <el-row class="content_footer">
            <span>{{v.updated_at}}</span>
            阅读
            {{v.watch}}
          </el-row>
        </el-row>
      </div>
    </el-row>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      Id: 0,
      content: []
    };
  },
  methods: {
    // 跳转文章详情
    detail(id) {
      //   this.$router.replace(`/post/detail?id=${id}`);
      this.Id=id
      this.$emit("closeMain", this.Id);
    },
    // 页面展示函数
    init() {
      this.$axios({
        url: "/posts",
        params: {
          city: this.city
        }
      }).then(res => {
        console.log(res.data);
        this.content = res.data.data;
        this.content.forEach(v => {
          v.updated_at = moment(v.updated_at).format("YYYY-MM-DD hh:mm");
          if (v.watch == null) {
            v.watch = 1;
          }
          if (v.images.length == 0) {
            v.images.push(
              "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3092702187,1721489646&fm=26&gp=0.jpg"
            );
          }
        });
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scope>
.content {
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
  height: 120px;
  img {
    width: 100px;
    height: 80px;
  }
  .content_right {
    width: 100%;
    padding-left: 10px;
    .content_footer {
      font-size: 12px;
      color: #999;
    }
    .content_top {
      height: 50px;
    }
  }
}
a{
  &:hover{
    text-decoration: underline;
    color: aqua;
    cursor:pointer;
  }
}
</style>