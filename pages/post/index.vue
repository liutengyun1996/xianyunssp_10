<template>
  <div class="post">
    <el-col type="flex" justify="space-between">
      <!-- left -->
      <el-col :span="7" class="post-left">
        <!-- left nav -->
        <ul class="nav">
          <li
            v-for="(v,i) in ['热门城市','推荐城市','奔向海岛','主题推荐']"
            :key="i"
            :class="{active: currentTab === i}"
            @mouseover="changeActive(i)"
            @mouseout="removeActive(i)"
          >
            {{v}}
            <i class="el-icon-arrow-right"></i>
          </li>
        </ul>
        <!-- 隐藏列表 -->
        <div
          class="ss"
          v-for="(v,i) in hide_list"
          :key="i"
          v-show="currentTab==i"
          @mouseover="changeActive(i)"
          @mouseout="removeActive(i)"
        >
          <ul>
            <li v-for="(v,i) in v.children" :key="i">
              <span>{{i+1}}</span>&nbsp;
              <a href="#" @click="list_cityName(v.city)">{{v.city}}</a>
              <a href="#" @click="list_cityName(v.city)">{{v.desc}}</a>
            </li>
          </ul>
        </div>
        <!-- 推荐城市 -->
        <h2>推荐城市</h2>
        <a href="#">
          <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt />
        </a>
      </el-col>
 
      <!-- right -->
      <el-col :span="17" class="post-right">
        <!-- input 搜索 -->
        <el-input placeholder="请输入想去的地方,比如 ' 广州 '" v-model="cityName" class="search">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="Isearch"></i>
        </el-input>
        <p class="tui">
          推荐：
          <span v-for="(v,i) in ['广州','上海','北京']" :key="i">
            <a href="#" @click="Asearch(v)">{{v}}</a>&nbsp;
          </span>
        </p>
        <!-- 推荐攻略 -->
        <el-row type="flex" justify="space-between" class="recommend">
          <span class="span">推荐攻略</span>
          <el-button type="primary" icon="el-icon-edit" class="btn" @click="write">写游记</el-button>
        </el-row>
        <!-- article content -->
        <div>
          <el-row
            type="flex"
            justify="space-between"
            class="content"
            v-for="(v,i) in content"
            :key="i"
          >
            <div class="content_left">
              <a href="#">
                <img :src="`${v.images[0]}`" alt />
              </a>
            </div>
            <div class="content_right">
              <a href="#" @click="detail(v.id)">{{v.title}}</a>
              <p class="content_middle">
                <a href="#" @click="detail(v.id)">{{v.summary}}</a>
              </p>
              <el-row type="flex" justify="space-between">
                <el-row class="content_footer_one">
                  <i class="el-icon-location-outline"></i>
                  {{v.cityName}} &nbsp; by&nbsp;
                  <a href="#">
                    <img :src="`${$axios.defaults.baseURL}${v.account.defaultAvatar}`" />
                    {{v.account.nickname}}
                  </a>
                  &nbsp;
                  <i class="el-icon-view"></i>
                  {{v.watch}}
                </el-row>
                <span class="content_footer_two">{{v.like}} 赞</span>
              </el-row>
            </div>
          </el-row>
        </div>
      </el-col>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTab: -1,
      // 文章列表
      content: [],
      // 城市id
      city: "1",
      cityName: "",
      // 隐藏列表
      hide_list: []
    };
  },
  methods: {
    // left 切换
    removeActive(i) {
      this.currentTab = -1;
    },
    changeActive(i) {
      this.currentTab = i;
    },
    // input搜索
    Isearch() {
      this.cities();
    },
    list_cityName(city) {
      this.cityName = city;
      this.cities();
    },
    // 推荐点击
    Asearch(v) {
      this.cityName = v;
    },
    // 写游记
    write() {
      this.$router.replace("/post/create");
    },
    // 跳转文章详情
    detail(id) {
      this.$router.push({
        path: "/post/detail",
        // url携带的参数
        query: { id }
      });
    },
    // 封装文章列表
    init() {
      this.$axios({
        url: "/posts",
        params: {
          city: this.city
        }
      }).then(res => {
        // console.log(111,res.data);
        this.content = res.data.data;
        this.content.forEach(v => {
          if (v.images.length == 0) {
            v.images.push(
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568558767347&di=6d5da2004642ae0b1469a80076c1aedc&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F05%2F86%2F55358PICZMw_1024.jpg"
            );
          }
        });
      });
    },
    // 封装搜索
    cities() {
      this.$axios({
        url: "/cities",
        params: {
          name: this.cityName
        }
      }).then(res => {
        // console.log(res);
        this.city = res.data.data[0].id;
        this.init();
      });
    }
  },
  mounted() {
    this.init();
    // 隐藏列表
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      this.hide_list = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.post {
  width: 1000px;
  margin: 0 auto 20px;
  padding: 20px 0;
  overflow: hidden;
  .post-left {
    position: relative;
    // background-color: pink;
    padding-right: 40px;
    .nav {
      border-top: 1px solid #ddd;
      li {
        border: 1px solid #ddd;
        border-top: 0px;
        padding: 10px 20px;
        font-size: 14px;
        &:hover {
          color: orange;
        }
        &:hover i {
          color: orange;
        }
        i {
          color: #ddd;
          float: right;
          font-size: 20px;
        }
      }
    }
    .ss {
      position: absolute;
      border: 1px solid #ddd;
      background-color: #fff;
      width: 320px;
      height: 200px;
      right: -260px;
      top: 0;
      padding-top: 5px;
      z-index: 9999999999999;
      li {
        padding: 6px;
        a {
          color: orange;
          &:hover {
            text-decoration: underline;
          }
          &:last-child {
            color: #999;
            font-size: 14px;
            &:hover {
              text-decoration: underline;
            }
          }
        }
        span {
          color: orange;
          font-size: 20px;
        }
      }
    }
    h2 {
      font-weight: normal;
      font-size: 16px;
      margin: 10px 0;
      padding: 10px 0;
      border-bottom: 1px solid #ddd;
    }
    a {
      img {
        width: 100%;
        display: block;
      }
    }
  }
  .post-right {
    .search {
      .el-input__inner {
        outline: none;
        border: 3px solid orange;
        padding: 0 20px;
      }
      i {
        color: orange;
        font-size: 20px;
        font-weight: bolder;
        margin-right: 5px;
      }
    }
    .tui {
      color: #666;
      font-size: 12px;
      margin: 5px 0;
      a {
        &:hover {
          color: orange;
          text-decoration: underline;
        }
      }
    }
    .recommend {
      // align-items: center;
      border-bottom: 1px solid #ddd;
      padding-bottom: 10px;
      .span {
        color: orange;
        font-weight: 400;
        font-size: 18px;
        // padding-bottom: 10px;
        margin-top: 15px;
      }
    }
    .content {
      padding: 20px 0;
      border-bottom: 1px solid #ddd;
      .content_left {
        margin-right: 10px;
        a {
          img {
            width: 220px;
            height: 150px;
          }
        }
      }
      .content_right {
        width: 480px;
        > a {
          font-size: 18px;
          &:hover {
            color: orange;
          }
        }
        .content_middle {
          margin: 10px 0;
          font-size: 14px;
          color: #666;
          a {
            height: 80px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            &:hover {
              color: #999;
            }
          }
        }
        .content_footer_one {
          font-size: 12px;
          color: #999;
          line-height: 30px;
          a {
            color: orange;
            img {
              width: 16px;
              height: 16px;
              border-radius: 50%;
              vertical-align: text-bottom;
            }
          }
        }
        .content_footer_two {
          color: orange;
        }
      }
    }
  }
}
</style>