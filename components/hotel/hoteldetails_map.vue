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
                <li
                  v-for="(item,index) in mapData.pois"
                  :key="index"
                  @mouseover="mouseover(item.location)"
                >
                  <span>{{item.name}}</span>
                  <span>1.03公里</span>
                </li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="交通" name="second">
            <div class="pane-first">
              <ul>
                <li v-for="(item,index) in mapData.pois" :key="index">
                  <span>{{item.name}}</span>
                  <span>1.03公里</span>
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
  props: {
    data: {
      type: Object,
      default: {
        location: {}
      }
    }
  },
  data() {
    return {
      mrzxd: "",
      conTer: [],
      activeName: "first",
      mapData: {},
      tabname: "风景名胜",
      zbwz: ["114.017079,22.65731", "113.917051,22.482804"]
    };
  },
  methods: {
    // 移入鼠标触发事件
    mouseover(location) {
      // let conterArr=location.split(",")
      // //  console.log(conterArr,22323);
      // let conTER=[
      // ]
      //  for(let o=0;o<1;o++){
      //   let nko={};
      //   nko.zuoz=+conterArr[0];
      //   nko.zuoy=+conterArr[1]
      //   conTER.push(nko)
      //  }
    },

    mapwz() {
      // 获取定位数据
      this.$axios({
        url: "https://restapi.amap.com/v3/place/text",
        params: {
          keywords: "",
          city: this.data.real_city,
          location: this.mrzxd,
          types: this.tabname,
          output: "json",
          page: 1,
          offset: 15,
          key: "3f5d5e9fbb24747c0663419eda205908"
        }
      }).then(res => {
        console.log(res);

        this.mapData = res.data;
        // let arrr=[]
        for (let i = 0; i < res.data.pois.length; i++) {
          this.zbwz.push(this.mapData.pois[i].location);
        }

        var arrzbwz = [];
        for (let i in this.zbwz) {
          arrzbwz.push(this.zbwz[i]); //属性
          //arr.push(obj[i]); //值
        }
        console.log(arrzbwz, 890);
      });
    },
    handleClick(tab, event) {
      this.tabname = "";
      this.tabname = tab.label;
      this.mapwz();
    }
  },
  mounted() {
    // 拿到中心坐标和
    setTimeout(() => {
      // console.log(this.data.location,567);
      var arrloc = [];
      for (let i in this.data.location) {
        arrloc.push(this.data.location[i]); //属性
        //arr.push(obj[i]); //值
      }
      this.mrzxd = arrloc;
      console.log(this.data.location.longitude, 4561);
      this.mapwz();
    }, 600);

    // console.log(this.data,6767);

    // 获取当前中心点的周边数据

    // 下面是处理地图的坐标数据,再传进下面地图mark使用
    // let arr=zbwzArr
    // console.log(zbwzArr.length,6444);

    // let arr=this.zbwz
    // console.log(arr.length);

    // let arr1=[]
    // for(let y=0;y<arr.length;y++){
    //      let temp =arr[y].split(',')
    //       let obj={}//不能放在外面,不然obj都是不变,多变量时可以试一下这个
    //  obj.flong=temp[0]
    //  obj.flati=temp[1]
    //  arr1.push(obj)
    //  console.log(arr1,98989);
    // }
    //   console.log(1225);

    // -----------------------------------------------------------
    window.onLoad = () => {
      console.log(this.data.location, 78686);
      let arr=[this.data.location.longitude,this.data.location.latitude]
      console.log(arr,888888);
      var map = new AMap.Map("container", {
        zoom: 15, //级别114.118866,22.604052this.data.location.longitude,this.data.location.latitude
        center: arr, //中心点坐标[114.118866,22.604052]
        viewMode: "3D" //使用3D视图
      });
      var marker;
      var markers = [];

      for (let i = 0; i < 8; i++) {
        //  var jfong1 = arr1[i].flong
        //  var jfong2 = arr1[i].flati
        marker = new AMap.Marker({
          // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]113.896291,22.604052
          position: new AMap.LngLat(`${this.zbwz[i]},`)
        });
      }
      map.add(marker);
      // var marker1 = new AMap.Marker({
      //       icon: '//vdata.amap.com/icons/b18/1/2.png', // 添加 Icon 图标 URL
      //     position: new AMap.LngLat(114.118866,22.604052),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      //     title: '深圳',

      // });

      // map.add(markers);
    };
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=04953eacfccf60a228e33e650207492a&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);

    // 注意现象,先运行静态代码,再运行他的代码,就不会提示Amap,get请求自动将数据拼接到url

    // }, 1000);
  }
};
</script>

<style lang='less' scoped>
.amap-markers:first-child .amap-icon img {
  width: 25px;
  height: 34px;
}
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