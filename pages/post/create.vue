<template>
  <div class="create">
    <el-row type="flex" class="row-bg">
      <el-col :span="19" class="left">
        <h2>发表新攻略</h2>
        <p>分享你的个人游记，让更多人看到哦！</p>
        <el-form ref="form" :model="form" label-width="100%">
          <el-input v-model="form.title" placeholder="请输入标题" class="title"></el-input>
          <!-- 富文本编辑器 -->
          <div>
            <VueEditor :config="config" ref="vueEditor" />
          </div>
          <!-- 选择城市 -->
          <el-form-item label="选择城市" label-width="70px" class="Cityname">
            <el-autocomplete
              placeholder="请搜索游玩城市"
              :fetch-suggestions="queryCityname"
              style="width:210px"
              v-model="form.destCity"
            ></el-autocomplete>
          </el-form-item>
          <p>
            <el-button type="primary" size="mini" @click="releaseContent">发布</el-button>&nbsp;或者&nbsp;
            <a @click="Draft">保存到草稿</a>
          </p>
        </el-form>
      </el-col>
      <el-col :span="5" class="right">
        <div class="draft">
          <p>草稿箱（）</p>
          <ul>
            <li v-for="(v,i) in draft" :key="i">
              <p>{{v.title}}</p>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 引入富文本框
let VueEditor;
if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}
export default {
  components: { VueEditor },
  data() {
    return {
      // 草稿箱
      draft: [{ title: "222" }],

      form: {
        title: "",
        destCity: "",
        content: "",
        Cityid: ""
      },
      // 富文本框配置
      config: {
        modules: {
          // 工具栏
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],
            ["image", "video"],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }] // text direction
          ]
        },
        // 主题
        theme: "snow",
        uploadImage: {
          url: "http://localhost:1337/upload",
          name: "files",
          uploadBefore(file) {
            return true;
          },
          uploadProgress(res) {},
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data[0].url);
          },
          uploadError() {},
          showProgress: false
        },

        uploadVideo: {
          url: "http://localhost:1337/upload",
          name: "files",
          uploadBefore(file) {
            return true;
          },
          uploadProgress(res) {},
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data[0].url);
          },
          uploadError() {}
        }
      }
    };
  },
  methods: {
    // 搜索城市展示
    queryCityname(value, cb) {
      if (!value) {
        // 传递空数组不会出现下拉框
        cb([]);
        return;
      }
      // 根据用户的输入请求建议城市
      this.$axios({
        url: "/airs/city",
        // get参数
        params: {
          // 输入框的关键字
          name: value
        }
      }).then(res => {
        // console.log(11, res.data);
        // 给数组中每个对象添加value属性
        res.data.data.forEach(v => {
          // 添加value属性
          v.value = v.name;
        });
        // 默认选中第一个
        this.form.destCity = res.data.data[0].value;
        this.form.Cityid = res.data.data[0].id;
        //显示到下拉列表中
        cb(res.data.data);
      });
    },
    // 保存到草稿
    Draft() {
      this.form.content = this.$refs.vueEditor.editor.root.innerHTML;
      console.log(this.form);
      // this.draft.unshift(this.form);
      // console.log(this.draft);
      this.$store.dispatch("draft/Save", this.form);
      // this.draft=this.$store.state.draft.draftInfo
      console.log(this.$store.state.draft.draftInfo);
      // this.draft.unshift(this.$store.state.draft.draftInfo);
      
    },
    // 发布文章
    releaseContent() {
      this.form.content = this.$refs.vueEditor.editor.root.innerHTML;
      console.log(this.form.content);
      if (this.form.title === "") {
        this.$message.error("请填写标题");
      } else {
        if (this.form.content === "") {
          this.$message.error("请填写文章内容");
        } else {
          if (this.form.destCity === "") {
            this.$message.error("请选择一个城市");
          } else {
            this.$axios({
              headers: {
                Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
              },
              url: "/posts",
              method: "post",
              data: {
                content: this.form.content,
                title: this.form.title,
                city: this.form.Cityid
              }
            }).then(res => {
              // console.log(res);
              if (res.status === 200) {
                this.$message.success("发布成功");
                let cityName = res.data.data.cityName.substr(
                  0,
                  res.data.data.cityName.length - 1
                );
                this.$router.push({
                  path: `/post`
                });
              }
            });
          }
        }
      }
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.create {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
  .left {
    // background-color: pink;
    padding-right: 50px;
    h2 {
      font-size: 22px;
      font-weight: normal;
      margin: 10px 0;
    }
    > p {
      font-size: 12px;
      color: #999;
      margin-bottom: 10px;
    }
    .title {
      margin-bottom: 20px;
    }
    .Cityname {
      margin: 20px 0;
    }
    p {
      > a {
        color: orange;
        font-size: 14px;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .right {
    // background-color: aqua;
    .draft {
      border: 1px solid #ddd;
    }
  }
}
.ql-editor {
  min-height: 300px;
  max-height: 600px;
  overflow-y: auto;
  img{
    width: 30%;
  }
}
</style>