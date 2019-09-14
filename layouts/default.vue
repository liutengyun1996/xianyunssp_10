<template>
  <div>
    <Header></Header>
    <nuxt />
    <Footer></Footer>
  </div>
</template>

<script>
// 引入组件
import Header from "@/components/commonality/header.vue";
import Footer from "@/components/commonality/footer.vue";
export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
* {
  margin: 0;
  padding: 0;
}
ul,
li,
ol {
  list-style: none;
}
i,
em {
  font-style: normal;
}
a {
  color: inherit;
  text-decoration: none;
}
a:link {
  text-decoration: none;
  /* 指正常的未被访问过的链接*/
}
a:visited {
  text-decoration: none;
  /*指已经访问过的链接*/
}
a:hover {
  text-decoration: none;
  color: #c81623;
  /*指鼠标在链接*/
}
a:active {
  text-decoration: none;
  /* 指正在点的链接*/
}
</style>
