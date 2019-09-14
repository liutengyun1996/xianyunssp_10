<template>
  <header>
    <el-card class="box-card">
      <div class="container">
        <!-- log -->
        <el-col :span="4">
          <h1 class="logo">
            <img src="http://157.122.54.189:9093/images/logo.jpg" />
          </h1>
        </el-col>

        <!-- 导航 -->
        <el-col :span="16">
          <el-row type="flex" class="nav">
            <nuxt-link to="/">首页</nuxt-link>
            <nuxt-link to="/post">旅游攻略</nuxt-link>
            <nuxt-link to="/hotel">酒店</nuxt-link>
            <nuxt-link to="/air">国内机票</nuxt-link>
          </el-row>
        </el-col>

        <!-- 登录 -->
        <el-col :span="4">
          <!-- 登录前 -->
          <nuxt-link to="/user/login" class="login" v-if="!$store.state.user.userInfo.token">登录 / 注册</nuxt-link>
          <!-- 登录后 -->
          <el-dropdown v-if="$store.state.user.userInfo.token" @command="handleCommand">
            <i>
              <el-row type="flex" align="middle" class="el-dropdown-link">
                <nuxt-link to="#">
                  <img
                    :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar"
                  />
                  {{$store.state.user.userInfo.user.nickname}}
                </nuxt-link>
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </el-row>
            </i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="personage">个人中心</el-dropdown-item>
              <el-dropdown-item command="exit">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- 个人中心及退出 -->
          <div></div>
        </el-col>
      </div>
    </el-card>
  </header>
</template>

<script>
export default {
  methods: {
    handleCommand(command) {
      if (command === "personage") {
        // console.log(123);
        this.$router.replace("/user/personal");
      } else if (command === "exit") {
        // console.log(456);
        const { commit } = this.$store;
        commit("user/cleanUserInfo");

        this.$message({
          message: "退出成功",
          type: "success"
        });
      }
    }
  }
};
</script>

<style lang="less" scope>
.el-card__body {
  padding: 0;
}
.box-card {
  height: 60px;
  .container {
    width: 1000px;
    margin: 0 auto;
    line-height: 60px;
    h1 {
      img {
        width: 100%;
        margin-top: 10px;
      }
    }
    .nav {
      margin-left: 10px;
      flex: 1;
      a {
        display: block;
        padding: 0 20px;
        height: 60px;
        box-sizing: border-box;
        &:hover {
          color: #409eff;
          border-bottom: 5px solid #409eff;
        }
      }
      // 该class是nuxt会去自动匹配nuxt-link的to的值，如果url和to的值相等会自动加上下面的class
      .nuxt-link-exact-active {
        background: #409eff;
        color: #fff;
        &:hover {
          color: #fff;
        }
      }
    }
  }

  .login {
    font-size: 14px;
    float: right;
  }
  .el-dropdown-link {
    img {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      border: 2px solid #fff;
      border-radius: 50px;
    }
  }
}
</style>