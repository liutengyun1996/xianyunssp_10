<template>
  <div class="filtrate">
    <div class="block1">
      <div class="title">
        <span>价格</span>
        <span>0-{{valuee}}</span>
      </div>
      <el-slider v-model="valuee" :max="4000"></el-slider>
    </div>
    <div class="block2">
      <div>住宿等级</div>
      <el-dropdown class="huakuai">
        <span class="el-dropdown-link">
          下拉菜单
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <i class="el-icon-arrow-down el-icon--right"></i>1星
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="el-icon-arrow-down el-icon--right"></i>2星
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="el-icon-arrow-down el-icon--right"></i>3星
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="el-icon-arrow-down el-icon--right"></i>4星
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="el-icon-arrow-down el-icon--right"></i>5星
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="block3">
      <div>住宿等级</div>
      <el-dropdown class="huakuai">
        <span class="el-dropdown-link">
          下拉菜单
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <i class="el-icon-arrow-down el-icon--right"></i>黄金糕
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="el-icon-arrow-down el-icon--right"></i>黄金糕
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="el-icon-arrow-down el-icon--right"></i>黄金糕
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="el-icon-arrow-down el-icon--right"></i>黄金糕
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="block4">
      <div>住宿等级</div>
      <el-dropdown class="huakuai">
        <span class="el-dropdown-link">
          下拉菜单
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <i class="el-icon-arrow-down el-icon--right"></i>黄金糕
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="el-icon-arrow-down el-icon--right"></i>黄金糕
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="el-icon-arrow-down el-icon--right"></i>黄金糕
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="el-icon-arrow-down el-icon--right"></i>黄金糕
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="block5">
      <div>住宿等级</div>
      <el-dropdown class="huakuai">
        <span class="el-dropdown-link">
          下拉菜单
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <i class="el-icon-arrow-down el-icon--right"></i>黄金糕
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="el-icon-arrow-down el-icon--right"></i>黄金糕
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="el-icon-arrow-down el-icon--right"></i>黄金糕
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="el-icon-arrow-down el-icon--right"></i>黄金糕
          </el-dropdown-item>
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
      valuee: 0
    };
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