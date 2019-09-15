<template>
  <div class="areaSelection">
    <!-- 区域选择 -->
    <el-row type="flex" class="area">
      <el-col :span="3">区域:</el-col>
      <el-col :span="21" class="areaAll">
        <a href="#">全部</a>
        <a v-for="(v,i) in scenics" :key="i">{{v.name}}</a>
        <p>
          <a @click="unfold">
            <i class="el-icon-d-arrow-right"></i>
            等{{scenics.length}}个区域
          </a>
        </p>
      </el-col>
    </el-row>
    <!-- 攻略区域 -->
    <el-row type="flex" class="area">
      <el-col :span="3">攻略:</el-col>
      <el-col
        :span="21"
      >北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</el-col>
    </el-row>
    <!-- 均价区域 -->
    <el-row type="flex" class="area">
      <el-col :span="3">
        均价
        <i class="el-icon-question"></i> :
      </el-col>
      <el-col :span="21">
        <!-- 评星 -->
        <el-row type="flex" class="evaluate">
          <el-col :span="8">
            <el-tooltip
              class="item"
              effect="dark"
              content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
              placement="bottom-start"
            >
              <el-rate v-model="value5" disabled text-color="#ff9900" score-template="{value}"></el-rate>
            </el-tooltip>¥332
          </el-col>
          <el-col :span="8">
            <el-tooltip
              class="item"
              effect="dark"
              content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
              placement="bottom-start"
            >
              <el-rate v-model="value5" disabled text-color="#ff9900" score-template="{value}"></el-rate>
            </el-tooltip>¥521
          </el-col>
          <el-col :span="8">
            <el-tooltip
              class="item"
              effect="dark"
              content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
              placement="bottom-start"
            >
              <el-rate v-model="value5" disabled text-color="#ff9900" score-template="{value}"></el-rate>
            </el-tooltip>¥768
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template> 

<script>
export default {
  // 区域选择
  props: {
    scenics: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      value5: 4
    };
  },
  methods: {
    unfold(){
      console.log(this.scenics)
    }
  },
  mounted() {
    this.$axios({
      url: "/cities",
      params: {
        name: "南京"
      }
    }).then(res => {
      console.log(res);
    });
  }
};
</script>

<style lang="less" scope>
.areaSelection {
  font-size: 14px;
  color: #666;
  padding-right: 10px;
  .evaluate {
    line-height: 22px;
    .el-rate {
      width: 100px;
      display: inline-block;
      i {
        margin: 0;
      }
    }
  }
  .areaAll {
    a {
      padding-right: 15px;
      padding-bottom: 3px;
    }
  }
}
</style>