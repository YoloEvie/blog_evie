<template>
  <a-card style="background-color: #f3edd1; margin-top: 30px">
    <a-divider orientation="left">个人介绍</a-divider>
    <a-descriptions>
      <a-descriptions-item label="姓名">赖馨怡</a-descriptions-item>
      <a-descriptions-item label="电话">13404009700</a-descriptions-item>
      <a-descriptions-item label="邮箱">1719854949@qq.com</a-descriptions-item>
      <a-descriptions-item label="学校">成都锦城学院</a-descriptions-item>
      <a-descriptions-item label="专业">
        数字媒体技术|前端方向
      </a-descriptions-item>
      <br />
      <a-descriptions-item label="专业技能">
        熟练使用HTML、CSS、javascript等前端技术，掌握Vue框架，精通figma、即时设计等原型设计工具。
      </a-descriptions-item>
    </a-descriptions>
    <a-divider orientation="left">项目经历</a-divider>
    <Timer></Timer>
    <a-divider orientation="left">校园经历</a-divider>
    <Certificate></Certificate>
    <div class="score">
      <ChartScore></ChartScore>
      <ChartScoreART></ChartScoreART>
    </div>
    <a-button type="primary">联系我</a-button>
  </a-card>
</template>
<script setup>
import ChartScore from "./Score.vue";
import ChartScoreART from "./Score-art.vue";
import Timer from "./Timer.vue";
import Certificate from "./Certificate.vue";
</script>
<style scoped>
.score {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
}
</style>
