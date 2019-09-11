<template>
  <div class="create">
    <el-row type="flex" class="row-bg">
      <el-col :span="19" class="left">
        <h2>发表新攻略</h2>
        <p>分享你的个人游记，让更多人看到哦！</p>
        <el-form ref="form" :model="form" label-width="100%">
          <el-input v-model="form.title" placeholder="请输入标题" class="title"></el-input>
          <!-- 富文本编辑器 -->
          <div
            class="quill-editor"
            :content="form.content"
            @change="onEditorChange($event)"
            @ready="onEditorReady($event)"
            v-quill:myQuillEditor="editorOption"
          ></div>
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
            <a href="#" @click="Draft">保存到草稿</a>
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
export default {
  
  data() {
    return {
      editorOption: "",
      // content: "i am changed",
      // 草稿箱
      draft: [{ title: "222" }],

      form: {
        title: "",
        destCity: "",
        content: "",
        Cityid: "",
        editorOption: {
          // some quill options
          modules: {
            toolbar: [
              ["bold", "italic", "underline", "strike"],
              ["blockquote", "code-block"]
            ]
          }
        }
      }
    };
  },
  methods: {
    onEditorReady(editor) {
      console.log("editor ready!", editor);
    },
    onEditorChange({ editor, html, text }) {
      console.log("editor change!", editor, html, text);
      this.form.content = html;
      // console.log("editor change!!!!!!!", this.form.content);
    },
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
        console.log(11, res.data);
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
    // 保持到草稿
    Draft() {
      // console.log(this.form);
      this.draft.unshift(this.form);
      // console.log(this.draft);
    },
    // 发布文章
    releaseContent() {
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
              console.log(res);
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
  mounted() {
    console.log("app init, my quill insrance object is:", this.myQuillEditor);
  }
};
</script>

<style lang="less" scope>
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
.quill-editor {
  min-height: 300px;
  max-height: 600px;
  overflow-y: auto;
}
</style>