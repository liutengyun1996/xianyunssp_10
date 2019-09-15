<template>
  <div class="hotel">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>酒店</el-breadcrumb-item>
      <el-breadcrumb-item>{{form.destCity}}酒店预订</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索栏 -->
    <el-form ref="form" :model="form" label-width="80px">
      <!-- 目的地 -->
      <el-autocomplete
        placeholder="目的地"
        :fetch-suggestions="queryCityname"
        style="width:210px"
        v-model="form.destCity"
        @select="findCities"
      ></el-autocomplete>

      <!-- 日期选择 -->
      <el-date-picker
        v-model="form.time"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>

      <!-- 人数选择 -->
      <!-- <el-autocomplete v-model="numPeople" placeholder="请输入人数">
        <i class="el-input__icon iconfont iconuser" slot="suffix"></i>
        <template slot-scope="props">
          <div>{{ props.item.label }}</div>
          <span>{{ props.item.value }}</span>
        </template>
      </el-autocomplete>-->

      <!-- 查看价格 -->
      <el-button type="primary" @click="price">查看价格</el-button>
    </el-form>

    <!-- 区域选择及地图 -->
    <el-row type="flex" class="row-map">
      <!-- 区域选择 -->
      <el-col :span="14">
        <areaSelection :scenics="scenics" />
      </el-col>
      <!-- 地图 -->
      <el-col :span="10">
        <mapShows />
      </el-col>
    </el-row>

    <!-- 酒店筛选 -->
    <Footer />  
  </div>
</template>

<script>
import areaSelection from "@/components/hotel/areaSelection";
import mapShows from "@/components/hotel/index_map";
import Footer from "@/components/hotel/foot";

export default {
  components: {
    areaSelection,
    mapShows,
    Footer
  },
  data() {
    return {
      form: {
        destCity: "",
        Cityid: ""
      },
      // 人数选择
      // 区域选择
      scenics: [],
      // 价格选择
      priceSelect: "",
      pois: []
    };
  },
  methods: {
    //目的地
    queryCityname(value, cb) {
      if (!value) {
        // 传递空数组不会出现下拉框
        cb([]);
        return;
      }
      // 根据用户的输入请求建议城市
      this.$axios({
        url: "cities",
        // get参数
        params: {
          // 输入框的关键字
          name: value
        }
      }).then(res => {
        // 给数组中每个对象添加value属性
        res.data.data.forEach(v => {
          // 添加value属性
          v.value = v.name;
        });
        // 默认选中第一个
        this.form.destCity = res.data.data[0].value;
        this.findCities();
        this.form.Cityid = res.data.data[0].id;
        //显示到下拉列表中
        cb(res.data.data);
      });
    },
    // 查看价格
    price() {
      // console.log(this.form);
      // console.log(this.pois);
    },
    // 查找城市
    findCities() {
      this.$axios({
        url: "/cities",
        params: {
          name: this.form.destCity
        }
      }).then(res => {
        this.scenics = res.data.data[0].scenics;
      });
    }
  },
  mounted() {
    // 展示
    this.$axios({
      url: "https://restapi.amap.com/v3/place/text",
      params: {
        keywords: "",
        city: this.form.destCity,
        location: "113.896291,22.558554",
        types: "旅馆",
        output: "json",
        page: 1,
        offset: 10,
        key: "3f5d5e9fbb24747c0663419eda205908"
      }
    }).then(res => {
      // console.log(11111, res);
      this.pois = res.data.pois;
    });
  }
};
</script>

<style lang="less" scope>
.hotel {
  width: 1000px;
  margin: 0 auto;
  // 面包屑
  .el-breadcrumb {
    padding: 20px 0;
  }
  //人数选择
  .my-autocomplete {
    li {
      line-height: normal;
      padding: 7px;

      .name {
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .addr {
        font-size: 12px;
        color: #b4b4b4;
      }

      .highlighted .addr {
        color: #ddd;
      }
    }
  }
  .el-form {
    margin: 20px 0;
  }
  .row-map{
    margin-bottom: 20px;
  }
}
</style>