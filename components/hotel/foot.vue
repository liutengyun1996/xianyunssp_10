<template>
  <div class="footer">
    <Filtrate></Filtrate>
    <div class="footer_list">
      <div class="hotel_item" v-for="(item,index) in hoterData" :key="index">
        <div class="hotel_item_left">
          <a>
            <img :src="item.photos" alt />
          </a>
        </div>
        <div class="hotel_item_center">
          <h5>
            <a @click="hotelId(item.id)">{{item.name}}</a>
          </h5>
          <div class="name">
            <span style="overflow:hidden;">{{item.alias}}</span>
            <span class="title">
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
            </span>
            <span>经济型</span>
          </div>
          <div>
            <div class="el-col-10">
              <el-rate
                v-model="item.stars"
                disabled
                show-score
                text-color="#f7ba2a"
                score-template="{value}"
              ></el-rate>
            </div>
            <div class="el-col-7">100条评价</div>
            <div class="el-col-7">6篇游记</div>
          </div>
          <div class="location-row">
            <i class="iconfont iconlocation"></i>
            位于：{{item.address}}
          </div>
        </div>
        <div class="hotel_item_right">
          <a href="https://hotels.ctrip.com/hotel/694679.html">
            <ul>
              <li v-for="(item1,index1) in item.products" :key="index1">
                <span>{{item1.name}}</span>
                <span>
                  <em>￥{{item1.price}}</em>起 >
                </span>
              </li>
            </ul>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Filtrate from "@/components/hotel/filtrate";
export default {
  components: {
    Filtrate
  },
  data() {
    return {
      hoterData: []
    };
  },
  methods: {
    hotelId(id) {
      this.$router.push({
        path: `/hotel/hoteldetails?id=${id}`
      });
    }
  },
  mounted() {
    this.$axios({
      url: "/hotels",
      params: this.$route.query
    }).then(res => {
      // console.log(res)
      this.hoterData = res.data.data;
      console.log("foot", this.hoterData);
    });
    // setInterval(()=>{
    //     console.log(this.$route)
    // },1000)
  }
};
</script>

<style lang="less" scope>
.footer_list {
  width: 1020px;
  margin: 0 auto;
  .hotel_item {
    padding: 25px 0px;
    border-bottom: 1px solid #ddd;
    width: 100%;
    display: flex;
    > div {
      flex: 1;
    }
    .hotel_item_left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      img {
        margin: 0 auto;
        width: 320px;
        height: 210px;
      }
    }
    .hotel_item_center {
      h5 {
        font-size: 26px;
        font-weight: 400;
      }
      .name {
        color: #b5b5b5;
        display: flex;
        > span {
          margin-right: 5px;
          &:nth-child(1) {
            width: 190px;
          }
        }
      }
      .title {
        display: flex;
        justify-content: center;
        // align-items: center;  子项在侧轴的排布方式
        //   flex-wrap:wrap;  让子项换行
        i {
          color: #ff9900;
          margin: 0px;
        }
      }
    }
    .hotel_item_right {
      > a {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column; //设置主轴的排布方式为从上到下
        justify-content: center; //设置子项在主轴上的排布方式  center是居中
        > ul {
          margin: 0 auto; //这一步是将
          width: 235px;
          height: 137px;
          > li {
            display: flex;
            height: 49px;
            border-bottom: 1px solid #ebeef5;
            line-height: 49px;
            &:hover {
              background-color: #f5f7fa;
            }
            > span {
              flex: 1;
              padding-left: 10px;
              em {
                color: #ffab2e;
              }
            }
          }
        }
      }
    }
  }
}
a {
  &:hover {
    cursor: pointer;
  }
}
</style>