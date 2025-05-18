<template>
  <div class="carousel-wrapper">
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="(img, index) in images" :key="index">
        <img :src="img" class="carousel-image" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
import img1 from "./Mine/003.png";
import img2 from "./Mine/001.png";
import img3 from "./Mine/002.png";
const images = [img1, img2, img3];
</script>

<style scoped>
/* 外层容器 */
.carousel-wrapper {
  width: 100%;
  padding: 20px 0;
}

/* 轮播容器 */
:deep(.el-carousel) {
  width: 100%;
  margin: 0 auto;
}

/* 轮播项目容器 */
:deep(.el-carousel__container) {
  margin: 0 auto;
  width: 100%;
  height: 500px !important;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

/* 轮播内容样式 */
.carousel-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #475669;
  font-size: 2.5em;
  margin: 0;
  transition: all 0.3s;
}

/* 指示器位置调整 */
:deep(.el-carousel__indicators--outside) {
  margin-top: 20px;
  transform: translateY(100%);
}

/* 自定义背景色 */
:deep(.el-carousel__item:nth-child(2n)) {
  background-color: #99a9bf;
}

:deep(.el-carousel__item:nth-child(2n + 1)) {
  background-color: #d3dce6;
}
/* 新增关键样式 */
.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

/* 删除或覆盖原有背景色 */
:deep(.el-carousel__item) {
  background-color: transparent !important;
}

/* 保持其他原有样式不变 */
.carousel-wrapper {
  width: 100%;
  padding: 20px 0;
}

:deep(.el-carousel) {
  width: 100%;
  margin: 0 auto;
}

:deep(.el-carousel__container) {
  height: 500px !important;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

:deep(.el-carousel__indicators--outside) {
  margin-top: 20px;
  transform: translateY(100%);
}
</style>
