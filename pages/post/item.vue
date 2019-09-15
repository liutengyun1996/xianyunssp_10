<template>
  <div>
    <!-- 攻略详情 -->
    <!-- <item :data="list" /> -->
    <Item :data="remark"></Item>
    乌鸦坐飞机  小鸡炖蘑菇  
  </div>
</template>

<script>
import Item from "@/components/post/detail_item";
export default {
  components: {
    Item
  },
  data() {
    return {
      //请求评论接口需要上传的对象
      air: {
        post: 4, //文章id
        //_sort:"", //排序
        _limit: 2, //条数
        _start: 34 //开始数据(分页)
      },
      //评论需要的数据
      remark: [],
      //item_son里面需要用到的一个数组
      item_son: []
    };
  },
  mounted() {
    this.$axios({
      url: "/posts/comments",
      params: this.air
    }).then(res => {
        console.log(res);
      this.remark = res.data.data;
      //console.log(this.remark)
    });
  },
};
</script>

<style lang="less" scoped>
</style>