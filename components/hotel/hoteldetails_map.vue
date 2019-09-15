<template>
  <div class="map">
    <el-row>
      <el-col :span="16">
        <div id="container"></div>
      </el-col>
      <el-col :span="8" class="poilist">
        <!-- 标签页 -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="风景" name="first">
            <div class="pane-first">
              <ul>
                <li>
                  <span>高淳老街</span>
                  <span>1.03公里</span>
                </li>
                <li>
                  <span>红太阳广场</span>
                  <span>0.60公里</span>
                </li>
                <li>
                  <span>甘霖广场</span>
                  <span>0.15公里</span>
                </li>
                <li>
                  <span>跬步居</span>
                  <span>0.12公里</span>
                </li>
                <li>
                  <span>凤岭公园</span>
                  <span>0.28公里</span>
                </li>
                <li>
                  <span>红宝丽广场</span>
                  <span>0.67公里</span>
                </li>
                <li>
                  <span>人民广场</span>
                  <span>1.96公里</span>
                </li>
                <li>
                  <span>高淳婚礼文化广场</span>
                  <span>0.63公里</span>
                </li>
                <li>
                  <span>红红的太阳</span>
                  <span>0.58公里</span>
                </li>
                <li>
                  <span>中山大街263号民居</span>
                  <span>0.69公里</span>
                </li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="交通" name="second">
            <div class="pane-first">
              <ul>
                <li>
                  <span>甘霖路口(公交站)</span>
                  <span>0.09公里</span>
                </li>
                <li>
                  <span>凤岭公园(公交站)</span>
                  <span>0.24公里</span>
                </li>
                <li>
                  <span>停车场(镇兴大厦西南)</span>
                  <span>0.24公里</span>
                </li>
                <li>
                  <span>镇兴大厦停车场</span>
                  <span>0.12公里</span>
                </li>
                <li>
                  <span>高淳(地铁站)</span>
                  <span>0.28公里</span>
                </li>
                <li>
                  <span>停车场(镇兴大厦西)</span>
                  <span>0.67公里</span>
                </li>
                <li>
                  <span>怡城花园(公交站)</span>
                  <span>1.96公里</span>
                </li>
                <li>
                  <span>停车场(甘霖路)</span>
                  <span>0.63公里</span>
                </li>
                <li>
                  <span>停车场(牡丹路)</span>
                  <span>0.58公里</span>
                </li>
                <li>
                  <span>停车场(春泉路)</span>
                  <span>0.69公里</span>
                </li>
              </ul>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log("map!!", tab, event);
    }
  },
  mounted() {
    window.onLoad = function() {
      var map = new AMap.Map("container", {
        zoom: 11, //级别
        // center: [113.388763,23.111389],//中心点坐标
        resizeEnable: true
      });
    };

    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=04953eacfccf60a228e33e650207492a&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
    this.$axios({
      url: "https://restapi.amap.com/v3/place/text",
      params: {
        keywords: "",
        city: "深圳",
        location: "113.896291,22.558554",
        types: "风景名胜",
        output: "json",
        page: 1,
        offset: 10,
        key: "3f5d5e9fbb24747c0663419eda205908"
      }
    }).then(res => {
      console.log(11111,res);
    });
  }
};
</script>

<style lang='less' scoped>
#container {
  width: 100%;
  height: 360px;
}
.poilist {
  padding-left: 15px;
  .pane-first {
    height: 300px;
    overflow: auto;
    font-size: 14px;
    color: #666;

    ul {
      li {
        // padding: 0 15px;
        display: flex;
        justify-content: space-between;
        // margin-bottom: 15px;
        cursor: pointer;
        margin: 0 10px 15px 10px;
      }
    }
  }
}
.map {
  margin: 45px 0;
  // background-color: rgb(126, 168, 185);
  height: 360px;
}
</style>