<template>
  <footer>
    <div class="footer_main">
      <el-row class="footer_top">
        <el-col :span="18">
          <el-row type="flex">
            <el-col :span="8">
              <h5>闲云旅游旅游网</h5>
              <ul>
                <li>上亿旅行者共同打造的"旅行神器"</li>
                <li>
                  <span>60,000</span>多个全球旅游目的地
                </li>
                <li>
                  <span>600,000</span> 个细分目的地新玩法
                </li>
                <li>
                  <span>760,000,000</span> 次攻略下载
                </li>
                <li>
                  <span>38,000</span> 家旅游产品供应商
                </li>
              </ul>
            </el-col>
            <el-col :span="8">
              <h5>关于我们</h5>
              <ul>
                <li>隐私政策 商标声明</li>
                <li>服务协议 游记协议</li>
                <li>商城平台服务协议</li>
                <li>网络信息侵权通知指引</li>
                <li>闲云旅游旅游网服务监督员</li>
                <li>网站地图加入闲云旅游</li>
              </ul>
            </el-col>
            <el-col :span="8">
              <h5>旅行服务</h5>
              <ul>
                <li>旅游攻略 酒店预订</li>
                <li>旅游特价 国际租车</li>
                <li>旅游问答 旅游保险</li>
                <li>旅游指南 订火车票</li>
                <li>旅游资讯 APP下载</li>
              </ul>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <div class="image">
            <img src="http://157.122.54.189:9093/images/1556522965.png" alt />
            <p>关注我们</p>
          </div>
        </el-col>
      </el-row>
      <p>京ICP备08001421号 京公网安备110108007702 Copyright &copy; 2016-2019 博学谷 All Rights Reserved</p>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="less" scope>
footer {
  background: #333333;
  .footer_main {
    width: 1000px;
    margin: 0 auto;
    .footer_top {
      border-bottom: 1px solid #ccc;
      padding-bottom: 15px;
      h5 {
        color: #ccc;
        font-size: 16px;
        font-weight: normal;
        padding: 30px 0 10px;
        padding-left: 40px;
      }
      ul {
        color: #ccc;
        font-size: 12px;
        padding-left: 40px;
        li {
          line-height: 24px;
          span {
            color: orange;
          }
        }
      }
      .image {
        text-align: center;
        img {
          width: 140px;
          height: 140px;
          margin-top: 30px;
        }
        p {
          color: #ccc;
          font-size: 12px;
          padding: 0;
        }
      }
    }
    p{
      text-align: center;
      color: #ccc;
      font-size: 12px;
      padding: 50px 0;
    }
  }
}
</style>