<template>
  <div class="container">
    <!-- 面包屑 -->
    <el-breadcrumb separator=">" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/hotel' }">{{hotelInfo.real_city}}{{hotelInfo.big_cate}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{hotelInfo.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 酒店名称 -->
    <div class="hotelNma">
      <h3>
        {{hotelInfo.name}}
        <span>
          <!-- hotellevel !-->
          <i
            class="iconfont icon--huangguan"
            v-for="(item,index) in hotelInfo.hotellevel"
            :key="index"
          ></i>
        </span>
      </h3>
      <p>{{hotelInfo.alias}}</p>
      <div class="hotelmapname">
        <i class="iconfont icon-ditu"></i>
        {{hotelInfo.address}}
      </div>
    </div>
    <!-- 图片 -->
    <el-row type="flex">
      <div class="hotelih">
        <!-- 左边图 -->
        <el-col :span="16" class="bigHotelimg">
          <img :src="bigimg" alt />
        </el-col>

        <!-- 右边图 -->
        <el-col :span="8" class="smHotelimg">
          <el-row type="flex" class="rowot">
            <el-col :span="12" class="rowotel-col" v-for="(item,index) in smimg" :key="index">
              <nuxt-link to>
                <img :src="item.url" alt @click="imgqie(index)" />
              </nuxt-link>
            </el-col>
          </el-row>
        </el-col>
      </div>
    </el-row>

    <!-- 网站来源表格 -->
    <el-table :data="hotelInfo.products" style="width: 100%">
      <el-table-column prop="name" label="价格来源"></el-table-column>
      <el-table-column prop="bestType" label="低价房型"></el-table-column>
      <el-table-column prop="price" label="最低价格/每晚">
        <template slot-scope="scope">
          <span class="tablePruce">¥ {{scope.row.price}}</span> 起
          <i class="el-icon-caret-right tablePruce"></i>
        </template>
      </el-table-column>
    </el-table>

    <!-- 这是地图模块组件 -->
    <Map :data="smhotelInfo"></Map>

    <!-- 这是酒店的基本信息配置 -->
    <div class="hbInfo">
      <el-row type="flex" class="hotbaseInfo">
        <el-col :span="4">基本信息</el-col>
        <el-col :span="20">
          <el-row>
            <el-col :span="6">
              <span>入住时间: 14:00之后</span>
            </el-col>
            <el-col :span="6">
              <span>离店时间: 12:00之前</span>
            </el-col>
            <el-col :span="6">
              <span>{{hotelInfo.creation_time}} / {{hotelInfo.renovat_time}}</span>
            </el-col>
            <el-col :span="6">
              <span>酒店规模: {{hotelInfo.roomCount}}间客房</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row type="flex" class="hotbaseInfo">
        <el-col :span="4">主要设施</el-col>
        <el-col :span="20">
          <div class="facilities">
            <span>外币兑换服务</span>
            <span>电梯</span>
            <span>洗衣服务</span>
            <span>热水壶</span>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" class="hotbaseInfo">
        <el-col :span="4">停车服务</el-col>
        <el-col :span="20">-</el-col>
      </el-row>
      <el-row type="flex" class="hotbaseInfo">
        <el-col :span="4">品牌信息</el-col>
        <el-col :span="20">{{hotelInfo.hotelbrand?hotelInfo.hotelbrand.name:'-'}}</el-col>
      </el-row>
    </div>

    <!-- 这是评论 -->
    <div class="comment">
      <h4>0条真实用户评论</h4>

      <el-row type="flex" align="middle">
        <el-col :span="4">
          <p>总评数：{{hotelInfo.good_remarks+hotelInfo.bad_remarks}}</p>
          <p>好评数：{{hotelInfo.good_remarks}}</p>
          <p>差评数：{{hotelInfo.bad_remarks}}</p>
        </el-col>
        <el-col :span="5" class="comment_right">
          <div class="icon_footer">
            <el-rate
              v-model="hotelInfo.stars"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            ></el-rate>
            <span class="Recommend">推荐</span>
          </div>
        </el-col>

        <el-col :span="3" class="comment_right">
          <div class="circle-rate">
            <el-progress
              type="circle"
              :percentage="pScores.environment"
              :width="70"
              :show-text="false"
              :stroke-width="2"
              :color="'orange'"
            ></el-progress>
            <span class="plscore">
              <span>环境</span>
              <span>{{hotelInfo.scores.environment}}</span>
            </span>
          </div>
        </el-col>
        <el-col :span="3" class="comment_right">
          <div class="circle-rate">
            <el-progress
              type="circle"
              :percentage="pScores.product"
              :width="70"
              :show-text="false"
              :stroke-width="2"
              :color="'orange'"
            ></el-progress>
            <span class="plscore">
              <span>产品</span>
              <span>{{hotelInfo.scores.product}}</span>
            </span>
          </div>
        </el-col>
        <el-col :span="3" class="comment_right">
          <div class="circle-rate">
            <el-progress
              type="circle"
              :percentage="pScores.service"
              :width="70"
              :show-text="false"
              :stroke-width="2"
              :color="'orange'"
            ></el-progress>
            <span class="plscore">
              <span>服务</span>
              <span>{{hotelInfo.scores.service}}</span>
            </span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// import Map form '"@/components/air/flightsListHead.vue"'
import Map from "@/components/hotel/hoteldetails_map";
// import { async } from 'q';

export default {
  components: {
    Map
  },
  data() {
    return {
      // 设置评分百分比样式
      pScores: {
        environment: 0,
        product: 0,
        service: 0
      },
      smhotelInfo: {
        location: {},
        real_city: []
      },
      percentage: {},
      // 设置当前城市页面的当前酒店信息
      hotelInfo: {
        location: {},
        scores: {}
      },

      // 大图默认显示图片
      bigimg: "http://157.122.54.189:9093/images/hotel-pics/1.jpeg",
      // 小图数据
      smimg: [
        { url: "http://157.122.54.189:9093/images/hotel-pics/1.jpeg" },
        { url: "http://157.122.54.189:9093/images/hotel-pics/2.jpeg" },
        { url: "http://157.122.54.189:9093/images/hotel-pics/3.jpeg" },
        { url: "http://157.122.54.189:9093/images/hotel-pics/4.jpeg" },
        { url: "http://157.122.54.189:9093/images/hotel-pics/5.jpeg" },
        { url: "http://157.122.54.189:9093/images/hotel-pics/6.jpeg" }
      ]
      // value: '
    };
  },
  methods: {
    // 图片切换功能
    imgqie(index) {
      // console.log(index);
      this.bigimg = this.smimg[index].url;
    },
    async gridata() {
      let res = await this.$axios({
        url: "/hotels",
        params: {
          id: this.$route.query.id,
          // city: 199,
          // price_in:200,
          // scenic:14,
          // 景点id
          // name_contains:'广州车陂南'	,
          // 名字模糊查询
          // hotellevel:5,
          // 酒店星级
          // hoteltype	:'经济'	,
          // 酒店类型
          // hotelbrand:'七天连锁',
          // hotelasset:'wifi',
          // 酒店设施
          enterTime: "2019-09-13",
          leftTime: "2019-06-14",
          // 入店时间
          // person:2,
          // 人数
          // _sort:-1,
          // 排序
          _limit: 10,
          // 条数
          _start: 0
        }
      });
      if (res.status === 200) {
        this.hotelInfo = res.data.data[0];
        this.smhotelInfo.location = res.data.data[0].location;
        this.smhotelInfo.real_city = res.data.data[0].real_city;
        //  console.log(this.smhotelInfo,7771111);
        // 设置百分比this.hotelInfo
        this.pScores.environment = this.hotelInfo.scores.environment * 10;
        this.pScores.product = this.hotelInfo.scores.product * 10;
        this.pScores.service = this.hotelInfo.scores.service * 10;
        //  console.log(res,777);
      }
    }
    // console.log(this.pScores);
  },
  mounted() {
    this.gridata();
  }
};
</script>

<style scoped lang='less'>
.container {
  width: 1000px;
  margin: 0 auto;
  margin-bottom: 100px;
}
/* 面包屑样式 */
.breadcrumb {
  margin: 18px 0;
}
/* 酒店名称 */
.hotelNma {
  margin-bottom: 40px;
  color: rgb(54, 53, 53);
  h3 {
    // font-family: '宋体';
    font-weight: 500;
    font-size: x-large;
    color: #333;
    span {
      .icon--huangguan {
        color: #f90;
      }
    }
  }
  .hotelmapname {
    font-size: 14px;
    color: #666;
  }
}

// 图片样式

.hotelih {
  margin-bottom: 70px;
  .bigHotelimg {
    img {
      height: 360px;
      width: 640px;
    }
  }
  .smHotelimg {
    .rowot {
      flex-wrap: wrap;
      .rowotel-col {
        padding-left: 10px;

        img {
          // padding-left: 10px;
          margin-bottom: 13px;
          width: 100%;
        }
      }
    }
  }
}
// 酒店来源
/deep/.el-table tbody tr:hover > td {
  background-color: pink;
  opacity: 0.5;
}
// /deep/.el-table__row{
//   &:hover{
//     cursor: pointer;
//     background-color: skyblue !important;
//   }
// }
.tablePruce {
  color: orange;
}
// 酒店基本信息
.hbInfo {
  margin-bottom: 25px;
  .hotbaseInfo {
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
    font-size: 14px;
    span {
      color: #666;
    }
    .facilities {
      span {
        background-color: #eee;
        padding: 8px;
        margin-right: 10px;
        color: #666;
        border-radius: 5px;
      }
    }
  }
}

.comment {
  h4 {
    margin-bottom: 25px;
  }
  // 推荐的部分

  .icon_footer {
    position: relative;
    // align-content: center;
    // line-height: 70px;

    .Recommend {
      width: 70px;
      height: 70px;
      line-height: 70px;
      text-align: center;
      position: absolute;
      top: -26px;
      left: 20px;
      border: 2px solid orange;
      opacity: 0.3;
      border-radius: 50%;
      font-size: 26px;
      transform: rotate(335deg);
    }
  }
  // 右边颜色
  .comment_right {
    color: orange;
  }
  // 右边三个样式

  .circle-rate {
    width: 70px;
    position: relative;

    .plscore {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }
  }
}
</style>