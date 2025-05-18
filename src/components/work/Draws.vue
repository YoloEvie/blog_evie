<template>
  <div class="handmade-container">
    <h2 class="text-center demonstration">手绘作品</h2>
    <el-carousel
      height="500px"
      direction="vertical"
      :autoplay="5000"
      v-if="drawings.length > 0"
    >
      <el-carousel-item
        v-for="drawing in drawings"
        :key="drawing.id"
        class="carousel-item"
      >
        <div class="content-wrapper">
          <img :src="drawing.src" :alt="drawing.name" class="drawing-image" />
          <div class="info-panel">
            <h3 class="title">{{ drawing.name }}</h3>
            <p class="description">
              {{ drawing.info || "暂无作品介绍" }}
            </p>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div v-else class="loading">加载中...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const drawings = ref([]);

const fetchDrawings = async () => {
  try {
    const response = await fetch("./data/draw.json");
    drawings.value = await response.json();
  } catch (error) {
    console.error("数据加载失败:", error);
    drawings.value = [];
  }
};

onMounted(() => {
  fetchDrawings();
});
</script>

<style scoped>
.handmade-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.content-wrapper {
  display: flex;
  height: 100%;
  padding: 20px;
  /* background: linear-gradient(to right, #f3edd1, #fffae3); */
  background: radial-gradient(circle at center, #fffae3, #f3edd1);
}

.drawing-image {
  width: 60%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.info-panel {
  flex: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #475669;
  max-height: 300px;
  overflow-y: auto;
}

.loading {
  text-align: center;
  padding: 50px;
  color: #666;
}

/* 滚动条样式 */
.description::-webkit-scrollbar {
  width: 6px;
}

.description::-webkit-scrollbar-track {
  background: #edb0b0;
}

.description::-webkit-scrollbar-thumb {
  background: #ffbcbc;
  border-radius: 3px;
}

.description::-webkit-scrollbar-thumb:hover {
  background: #cbcaca;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
    padding: 10px;
  }

  .drawing-image {
    width: 100%;
    height: 60%;
  }

  .info-panel {
    padding: 15px;
  }

  .title {
    font-size: 1.5rem;
  }

  .description {
    font-size: 1rem;
  }
}
</style>
