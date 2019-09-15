<template>
  <div class="llogin">
    <el-row class="main">
      <!-- 表单头部tab -->
      <el-row type="flex" class="tabs">
        <span
          v-for="(item, index) in [`登录`, `注册`]"
          :key="index"
          @click="handleChangeTab(index)"
          :class="{active: currentTab === index}"
        >{{item}}</span>
      </el-row>

      <!-- 登录功能组件 -->
      <el-form v-if="currentTab == 0" class="form" :model="form" :rules="formrules" ref="form">
        <el-form-item class="form-item" prop="username">
          <el-input placeholder="用户名/手机" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item class="form-item" prop="password">
          <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
        </el-form-item>
        <p class="form-text">
          <nuxt-link to="#">忘记密码</nuxt-link>
        </p>
        <el-button class="submit" type="primary" @click="loginbtn">登录</el-button>
      </el-form>

      <!-- 注册功能组件 -->
      <el-form
        v-if="currentTab == 1"
        class="form"
        :model="register"
        :rules="formrules"
        ref="register"
      >
        <el-form-item class="form-item" prop="username">
          <el-input placeholder="用户名手机" v-model="register.username"></el-input>
        </el-form-item>

        <el-form-item class="form-item" prop="captcha">
          <el-input placeholder="验证码" v-model="register.captcha">
            <template slot="append">
              <el-button @click="Verification">获取验证码</el-button>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item class="form-item" prop="nickname">
          <el-input placeholder="你的昵称" v-model="register.nickname"></el-input>
        </el-form-item>

        <el-form-item class="form-item" prop="password">
          <el-input placeholder="密码" type="password" v-model="register.password"></el-input>
        </el-form-item>

        <el-form-item class="form-item" prop="checkPassword">
          <el-input placeholder="确认密码" type="password" v-model="checkPassword"></el-input>
        </el-form-item>

        <el-button class="submit" type="primary" @click="registerbtn">注册</el-button>
      </el-form>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (this.checkPassword === "") {
        callback(new Error("请再次输入密码"));
      } else if (this.checkPassword !== this.register.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      currentTab: 0,
      // 登录功能
      form: {
        username: "",
        password: ""
      },
      // 注册功能
      register: {
        username: "",
        captcha: "",
        nickname: "",
        password: ""
      },
      // 密码验证
      checkPassword: "",
      formrules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符之间",
            trigger: "blur"
          }
        ],
        nickname: [
          {
            required: true,
            message: "请输入昵称",
            trigger: "blur"
          }
        ],
        captcha: [
          {
            required: true,
            message: "请输入六位数的验证码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 6,
            message: "请输入六位数的验证码",
            trigger: "blur"
          }
        ],
        checkPassword: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // tab 切换
    handleChangeTab(index) {
      this.currentTab = index;
    },
    // 登录
    loginbtn() {
      //  console.log(this.form);
      // 二次验证
      this.$refs.form.validate(valid => {
        //当valid的值等于true说明表单验证通过
        if (valid) {
          //   console.log('验证通过')
          this.$axios({
            url: "/accounts/login",
            method: "POST", //重要   method没有s
            data: this.form
          }).then(res => {
            // console.log(res);
            //commit接收两个参数,第一个mutations参数是方法名,第二个是参数数据
            this.$store.commit("user/setUserInfo",res.data)
            // this.$router.push({
            //   path:'/'
            // })
            // 返回上一页
            this.$router.back();
          });
        } else {
          console.log("验证失败");
        }
      });
    },
    // 注册
    registerbtn() {
      // console.log(this.register.password);
      // console.log(this.checkPassword);
      // 二次验证
      this.$refs.register.validate(valid => {
        if (valid) {
          this.$axios({
            url: "/accounts/register",
            method: "POST",
            data: {
              username: this.register.username,
              nickname: this.register.nickname,
              captcha: this.register.captcha,
              password: this.register.password
            }
          })
            .then(res => {
              console.log(res);
              if (res.status === 200) {
                this.$confirm("注册成功,点击确定跳转至登录页面", "提示", {
                  confirmButtonText: "确定",
                  showCancelButton: false,
                  type: "success"
                }).then(() => {
                  this.currentTab = 0;
                  this.form.username = res.data.user.username;
                });
              }
            })
            .catch(err => {
              console.log(err);
              this.$message.error("注册失败");
            });
        }
      });
    },
    // 发送验证码
    Verification() {
      let re = /^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/;
      if (!re.test(this.register.username)) {
        this.$confirm("手机号码格式错误", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      this.$axios({
        url: "/captchas",
        method: "POST",
        data: {
          tel: this.register.username
        }
      })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.$confirm(`获取的验证码为 ${res.data.code}`, "提示", {
              confirmButtonText: "确定",
              showCancelButton: false,
              type: "success"
            });
            this.register.captcha = res.data.code;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("获取验证码失败");
        });
    }
  }
};
</script>

<style lang="less" scope>
.llogin {
  background: url(http://127.1:1337/assets/images/th02.jfif);
  height: 700px;
  min-width: 1000px;
  position: relative;
  .main {
    width: 400px;
    background: #fff;
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
    margin-left: -200px;
    position: absolute;
    left: 50%;
    top: 30%;
    .tabs {
      width: 100%;
      span {
        display: block;
        width: 50%;
        height: 50px;
        box-sizing: border-box;
        border-top: 2px #eee solid;
        background: #eee;
        line-height: 48px;
        text-align: center;
        cursor: pointer;
        color: #666;
        &.active {
          color: orange;
          border-top-color: orange;
          background: #fff;
          font-weight: bold;
        }
      }
    }
  }
}
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>