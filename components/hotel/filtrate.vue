<template>
  <div class="filtrate">
    <div class="block1">
      <div class="title">
        <span>价格</span>
        <span>0-{{hotelsOptions.valuee}}</span>
      </div>
      <el-slider v-model="hotelsOptions.valuee" :max="4000"></el-slider>
    </div>

    <!-- 住宿等级 -->
    <div class="block2">
      <div>住宿等级</div>
      <el-dropdown @command="handleLevels" class="huakuai">
        <span class="el-dropdown-link">
          {{this.hotelsResult.levels}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" style="width:10%">
          <el-dropdown-item
            v-for="(v,i) in hotelsOptions.levels"
            :key="i"
            :command="v.name"
          >{{v.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 住宿类型 -->
    <div class="block3">
      <div>住宿类型</div>
      <el-dropdown @command="handleTypes" class="huakuai">
        <span class="el-dropdown-link">
          {{this.hotelsResult.types}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" style="width:10%">
          <el-dropdown-item
            v-for="(v,i) in hotelsOptions.types"
            :key="i"
            :command="v.name"
          >{{v.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 酒店设施 -->
    <div class="block4">
      <div>酒店设施</div>
      <el-dropdown @command="handleAssets" class="huakuai">
        <span class="el-dropdown-link">
          {{this.hotelsResult.assets}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" style="width:10%">
          <el-dropdown-item
            v-for="(v,i) in hotelsOptions.assets"
            :key="i"
            :command="v.name"
          >{{v.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 酒店品牌 -->
    <div class="block5">
      <div>酒店品牌</div>
      <el-dropdown @command="handleBrands" class="huakuai">
        <span class="el-dropdown-link">
          {{this.hotelsResult.brands}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" style="width:10%">
          <el-dropdown-item
            v-for="(v,i) in hotelsOptions.brands"
            :key="i"
            :command="v.name"
          >{{v.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //那个滑块的值  现在需求是0-4000
      checked: true,
      hotelsOptions: {
        valuee: 0, // 滑块值
        assets: [], // 房间设施
        brands: [], //酒店品牌
        levels: [], //住宿等级
        types: [] //住宿类型
      },
      hotelsResult: {
        assets: "不限", // 房间设施
        brands: "不限", //酒店品牌
        levels: "不限", //住宿等级
        types: "不限" //住宿类型
      }
    };
  },
  methods: {
    handleLevels(command) {
      this.hotelsResult.levels = command;
    },
    handleTypes(command) {
      this.hotelsResult.types = command;
    },
    handleAssets(command) {
      this.hotelsResult.assets = command;
    },
    handleBrands(command) {
      this.hotelsResult.brands = command;
    }
  },
  mounted() {
    this.$axios({
      url: "hotels/options"
    }).then(res => {
      console.log(1111, res);
      this.hotelsOptions = res.data.data;
    });
  }
};
</script>

<style lang="less">
.filtrate {
  border: 1px solid #dfdfdf;
  width: 1000px;
  padding: 5px 20px;
  display: flex;
  margin: 0 auto;
  > div {
    flex: 1;
    padding: 5px 20px;
    border-right: 1px solid #e5e5e5;
    &:nth-child(5) {
      border: none;
    }
  }
  .block1 {
    .title {
      display: flex;
      justify-content: space-between;
    }
  }
  //命名错误了
  .huakuai {
    display: flex;
    align-items: center;
    height: 38px;
  }
}
</style>