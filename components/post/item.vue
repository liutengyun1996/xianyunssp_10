<template>
  <div class="digui-item">
    <div v-for="(item,index) in data" :key="index" @click="handletest(data)">
      <!-- 先用普通的方法把所有的分类渲染 -->
      {{item.title}}
      <!-- <div v-for="(item2,index) in item.children" :key="index">{{item2.title}} {{index}}</div> -->
      <!-- <item :data="item.children" v-if="item.children"/> -->
      <!-- 通过调用item  并且给item每次传的参数都不一样  那么总会有item.children = false的时候  那时候就结束循环 -->
    </div>
  </div>
</template>

<script>
export default {
  name: "item",
  props:{
      data:{
        //   type:Array,
        //   default:[]
      }
  },
//   props:["data"],
  methods:{
      handletest(){
          console.log(this.data)
      }
  }
};
</script>

<style>
.digui-item div {
  padding-left: 50px;
}
</style>