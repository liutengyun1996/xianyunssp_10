<template>
  <div class="map">
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pois: []
    };
  },
  mounted() {
    window.onLoad = function() {
      var map = new AMap.Map("container", {
        pitch: 75, // 地图俯仰角度，有效范围 0 度- 83 度
        viewMode: "3D", // 地图模式
        zoom: 11, //级别
        center: [118.8718107, 31.32846821] //中心坐标
      });
    };
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=1102d5944104be5bda792a5b8281e508&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
    
  }
};
</script>

<style lang="less" scoped>
.map {
  #container {
    width: 420px;
    height: 260px;
    margin: 0 auto;
  }
}
</style>