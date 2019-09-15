<template>
  <div>
    <!-- 评论头像展示区域 -->
    <!-- :style="`order:${data.level};`"   style="padding: 2px 1px 1px 3px;"-->
    <div class="cmt_item_floor" style="border:1px solid #ddd;padding:2px;">
      <!-- style="padding:5px 10px 0px 10px" -->
      <div class="cmt_item_son" style="padding:3px 5px 3px">
        <div class="cmt_content_son">
          <!-- 这个是内容 -->
          <p class="cmt_message_son">{{data.content}}</p>
          <!-- 很单纯的为了美观 -->
          <div class="ctrl_son"></div>
        </div>
        <div class="cmt_info_son">
          <img :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar" />
          {{$store.state.user.userInfo.user.nickname}}
          {{nowTime}}
          <span
            style="float:right"
          >{{data.level}}</span>
        </div>
        <!-- 评论内容展示区域 -->
        <item :data="data.parent" v-if="data.parent" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
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