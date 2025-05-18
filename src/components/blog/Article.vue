<template>
  <div class="container">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading">
      <el-skeleton :rows="5" animated />
    </div>

    <!-- 错误提示 -->
    <el-alert
      v-else-if="error"
      title="数据加载失败"
      type="error"
      :description="error"
      show-icon
      closable
    />

    <!-- 正常内容 -->
    <template v-else>
      <el-card
        v-for="(item, index) in articles"
        :key="index"
        class="article-card"
      >
        <template #header>
          <div class="card-header">
            <router-link
              :to="{
                name: 'article-detail',
                params: { id: item.id },
              }"
              class="nav-link nav-p"
            >
              <h3>{{ item.title }}</h3>
              <span class="time">{{ item.time }}</span>
            </router-link>
          </div>
        </template>

        <div class="content">
          <p>{{ item.info }}</p>
          <div v-if="item.imgs.length" class="image-grid">
            <img
              v-for="(img, imgIndex) in item.imgs.slice(2, 3)"
              :key="imgIndex"
              :src="img"
              alt="旅行图片"
              class="article-image"
            />
          </div>
          <div v-else class="no-image">
            <el-icon :size="50" color="#909399"><Picture /></el-icon>
            <p>暂无图片</p>
          </div>
        </div>
      </el-card>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Picture } from "@element-plus/icons-vue";

interface Article {
  id: number;
  title: string;
  info: string;
  content: string;
  time: string;
  imgs: string[];
}

const articles = ref<Article[]>([]);
const loading = ref(true);
const error = ref("");

const fetchData = async () => {
  try {
    const response = await fetch("./data/article.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    articles.value = data.map((item: Article) => ({
      ...item,
      imgs: item.imgs || [],
    }));
  } catch (err) {
    error.value = err instanceof Error ? err.message : "未知错误，请稍后重试";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.container {
  display: grid;
  gap: 20px;
  padding: 20px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.article-card {
  background-color: #f3edd1;
  box-shadow: none;
  margin-bottom: 20px;
  transition: box-shadow 0.3s;
}

.article-card:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.time {
  font-size: 0.8em;
  color: #909399;
}

.content p {
  line-height: 1.6;
  color: #606266;
}

.image-grid {
  display: grid;
  gap: 10px;
  margin-top: 15px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}

.article-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 4px;
}

.no-image {
  text-align: center;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 4px;
  margin-top: 15px;
}

.no-image p {
  margin-top: 10px;
  color: #909399;
}
</style>
