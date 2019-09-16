<template>
  <!-- 评论头像展示区域 -->
  <!-- :style="`order:${data.level};`"   style="padding: 2px 1px 1px 3px;"-->
  <div class="cmt_item_floor" style="border:1px solid #ddd;padding:2px;">
    <!-- style="padding:5px 10px 0px 10px" -->
    <div class="cmt_item_son" style="padding:3px 5px 3px">
      <div
        class="cmt_content_son"
        @mouseenter.stop="enter(data.level)"
        @mouseleave.stop="leave(data.level)"
      >
        <!-- 这个是内容 -->
        <p class="cmt_message_son">{{data.content}}</p>
        <!-- 很单纯的为了美观 -->
        <div class="ctrl_son">
          <!-- ref="handleTell" -->
          <a
            class="handleTell"
            href="javascript:;"
            v-show="tellHidden&&(current===data.level)"
            style="float:right;font-size:12px;color:#1e50a2;"
            @click="handleTell(data.account.nickname,data.id)"
          >回复</a>
        </div>
      </div>
      <div class="cmt_info_son">
        <img :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar" />
        {{data.account.nickname}}
        {{nowTime}}
        <span
          style="float:right"
        >{{data.level}}</span>
      </div>
      <!-- 评论内容展示区域 -->
      <item :data="data.parent" v-if="data.parent" />
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      //回复功能需要用到的数据
      tellHidden: false,
      current: -1
    };
  },
  name: "item",
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  computed: {
    // 计算属性是一个函数 但是使用方式却是属性的用法
    nowTime() {
      var date = new Date();
      //   console.log(date);
      date = moment(date).format("YYYY-MM-DD HH:mm");
      //   console.log(date);
      return date;
    }
  },
  mounted() {
    setTimeout(() => {
      // console.log(12442);
      // console.log(this.data);
      // console.log(this.$refs.handleTell)
    }, 1000);
  },
  methods: {
    enter(level) {
      // console.log(this.$refs.handleTell.style,123456)
      // this.$refs.handleTell.style.display = 'none'
      // console.log(level);
      this.tellHidden = true;
      this.current = level;
    },
    leave(leave) {
      // console.log(leave)
      this.tellHidden = false;
      this.current = -1;
    },
    handleTell(name,id) {
      //回复的那个功能
      var name = "回复 @" + name;
      //回复功能  回复的时候里面会加上一个@xxx的标签
      //提交vuex把store里面的值修改
      this.$store.commit("post/setTags", { name, type: "info", id });
    }
  }
};
</script>

<style lang="less" scoped>
// .cmt_item_floor {
//   border-bottom: 1px dashed #ddd;
//   // &:last-child {
//   //   border-bottom: none;
//   // }
// }

.cmt_item_son {
  display: flex;
  flex-direction: column-reverse;
  // border: 1px solid #dddddd;
  background-color: #f9f9f9;
  .cmt_info_son {
    font-size: 12px;
    height: 16px;
    img {
      height: 16px;
      width: 16px;
      border-radius: 50%;
      vertical-align: top;
    }
  }
  .cmt_content_son {
    // padding-left: 30px;
    .ctrl_son {
      height: 20px;
    }
  }
}
</style>