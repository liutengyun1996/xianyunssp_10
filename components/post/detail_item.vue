<template>
  <div>
    <div class="detail_list">
      <!-- 评论头像展示区域 -->
      <div class="cmt_item" v-for="(item,index) in data" :key="index">
        <div class="cmt_info">
          <img :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar" />
          {{item.account.nickname}}
          {{nowTime}}
          <span
            style="float:right"
          >{{item.level}}</span>
        </div>
        <!-- 评论内容展示区域 -->

        <div style="padding-left:30px;">
          <itemSon v-if="item.parent" :data="item.parent" />
        </div>
        <div class="cmt_content" @mouseenter="enter(index)" @mouseleave="leave(index)">
          <div class="demo-image__preview">
            <el-image
              v-for="(item1,index1) in item.pics"
              :key="index1"
              style="width: 80px; height: 80px"
              :src="'http://157.122.54.189:9095'+item1.url"
              :preview-src-list="srcList"
              @click="editImage(item.pics)"
            ></el-image>
          </div>
          <!-- 很单纯的为了美观  有个作用  里面再加一个回复功能-->
          <div class="ctrl">
            <a
              class="handleTell"
              ref="handleTell"
              href="javascript:;"
              v-show="tellHidden&&current===index"
              style="float:right;font-size:12px;color:#1e50a2;"
              @click="handleTell(item.account.nickname,item.id)"
            >回复</a>
          </div>
          <p class="cmt_message">{{item.content}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import itemSon from "@/components/post/item_son";
export default {
  components: {
    itemSon
  },
  data() {
    return {
      source: [],
      //保存的数组  传递给子组件
      item_son: [],
      //回复 显示/隐藏的boollean
      tellHidden: false,
      //回复这个功能要用双重判断
      current: -1,
      //图片需要的  预览
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
      ]
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
  },
  methods: {
    handleTell(name,id) {
      var name = '回复 @'+name
      //回复功能  回复的时候里面会加上一个@xxx的标签
      //提交vuex把store里面的值修改
      this.$store.commit('post/setTags',{name, type: "info",id })
      // console.log(this.$store.state.post.dynamicTags)
    },
    enter(index) {
      this.tellHidden = true;
      // console.log()
      this.current = index;
    },
    leave(index) {
      this.tellHidden = false;
    },
    editImage(arr){
      var temp = []
      console.log(arr)
      arr.forEach((v)=>{
        temp.push('http://157.122.54.189:9095'+v.url)
      })
      // console.log(temp)
      this.srcList = temp
    }
  }
};
</script>

<style lang="less" scoped>
.detail_list {
  margin: 10px;
  //开发的时候删掉
  // border: 1px solid #ddd;
}

.cmt_item {
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
    // > img {
    //   width: 80px;
    //   height: 80px;
    // }
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