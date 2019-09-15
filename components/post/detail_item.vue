<template>
  <div>
    <div class="detail_list">
      <!-- 评论头像展示区域 -->
      <div class="cmt_item" v-for="(item,index) in data" :key="index">
        <div class="cmt_info">
          <img :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar" />
          {{$store.state.user.userInfo.user.nickname}}
          {{nowTime}}
          <span
            style="float:right"
          >{{item.level}}</span>
        </div>
        <!-- 评论内容展示区域 -->
        
        <div style="padding-left:30px;"><itemSon v-if="item.parent" :data="item.parent" /></div>
        <div class="cmt_content">
          <!-- 很单纯的为了美观 -->
          <div class="ctrl"></div>
          <p class="cmt_message">{{item.content}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment, { fn } from "moment";
import itemSon from "@/components/post/item_son";
export default {
  components: {
    itemSon
  },
  data() {
    return {
      source: [],
      //保存的数组  传递给子组件
      item_son: []
    };
  },
  props: ["data"],
  computed: {
    // 计算属性是一个函数 但是使用方式却是属性的用法
    nowTime() {
      var date = new Date();
      //   console.log(date);
      date = moment(date).format("YYYY-MM-DD HH:mm");
      //   console.log(date);
      return date;
    }
    //强行把对象转换成数组
  }
  //   created() {
  //     console.log(12341, this.data);
  //   },
  //   methods: {
  //     //value是一个对象
  //     getdata(value) {
  //       console.log(value);
  //       if (value.parent) {
  //         this.item_son.push(value.parent);
  //         this.getdata(value.parent);
  //       }
  //       //递归  每次给的value的值 都不一样
  //     }
  //   },
  //   mounted(){
  //       setTimeout(()=>{
  //         //console.log(this.data)
  //         this.getdata(this.data[0])
  //         this.item_son.reverse()
  //         // console.log(this.item_son)
  //       },1000)
  //   }
};
</script>

<style lang="less" scoped>
.detail_list {
  margin: 10px;
  //开发的时候删掉
  border: 1px solid #ddd;
}

.cmt_item {
  border-bottom: 1px dashed #ddd;
  padding: 20px 20px 5px 20px;

  &:last-child {
    border-bottom: none;
  }
  //   transform: rotate(180deg);
  .cmt_info {
    margin-bottom: 10px;
    font-size: 12px;
    height: 16px;
    img {
      height: 16px;
      width: 16px;
      border-radius: 50%;
      vertical-align: top;
    }
  }
  .cmt_content {
    padding: 0px 0px 0px 10px;
    display: flex;
    // flex-direction: column;
    flex-direction: column-reverse;
    padding-left: 30px;
    .ctrl {
      height: 20px;
    }
  }
}

// 测试的时候为了美观
// .cmt_item {
//   margin-bottom: 100px;
// }
</style>