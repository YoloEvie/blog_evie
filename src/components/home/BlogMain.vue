<template>
  <h3 :style="{ margin: '15px 0' }">开发类博客</h3>
  <a-list v-if="techLoading" size="large" bordered>
    <a-skeleton active />
  </a-list>
  <a-list v-else size="large" bordered :data-source="techData">
    <template #renderItem="{ item }">
      <a-list-item>
        <a :href="item.url" target="_blank" class="nav-link">{{
          item.title
        }}</a>
      </a-list-item>
    </template>
    <template #footer>
      <div>
        <a-button type="primary">
          <router-link to="/blog/technique">更多</router-link>
        </a-button>
      </div>
    </template>
  </a-list>

  <h3 :style="{ margin: '15px 0' }">生活类博客</h3>
  <a-list v-if="lifeLoading" size="large" bordered>
    <a-skeleton active />
  </a-list>
  <a-list v-else size="large" bordered :data-source="lifeData">
    <template #renderItem="{ item }">
      <a-list-item>
        <router-link :to="`/blog/article/${item.id}`" class="nav-link">
          {{ item.title }}
          <span class="meta">（{{ item.time }}）</span>
        </router-link>
      </a-list-item>
    </template>
    <template #footer>
      <div>
        <a-button type="primary">
          <router-link to="/blog/article">更多</router-link>
        </a-button>
      </div>
    </template>
  </a-list>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

interface Blog {
  id: string;
  title: string;
  content: string;
  date: string;
  url: string;
  star: string;
  like: string;
  message: string;
  img: string;
}

const techData = ref<Blog[]>([]);
const lifeData = ref<Blog[]>([]);
const techLoading = ref(true);
const lifeLoading = ref(true);
const error = ref("");

// 获取开发类博客
const fetchTechBlogs = async () => {
  try {
    const response = await fetch("/data/tech-blogs.json");
    if (!response.ok) throw new Error("数据加载失败");
    // techData.value = await response.json();
    const data = await response.json();
    techData.value = data.slice(0, 4);
  } catch (err) {
    error.value = "开发类博客加载失败，请稍后重试";
  } finally {
    techLoading.value = false;
  }
};

// 获取生活类博客
const fetchLifeBlogs = async () => {
  try {
    const response = await fetch("/data/article.json");
    if (!response.ok) throw new Error("数据加载失败");
    const data = await response.json();
    lifeData.value = data.slice(0, 3);
  } catch (err) {
    error.value = "生活类博客加载失败，请稍后重试";
  } finally {
    lifeLoading.value = false;
  }
};

onMounted(() => {
  fetchTechBlogs();
  fetchLifeBlogs();
});
</script>

<style scoped>
.nav-link {
  color: #333;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #e24b2a;
  text-decoration: underline;
}

.meta {
  font-size: 0.8em;
  color: #666;
  margin-left: 8px;
}

.ant-list-item {
  padding: 12px 24px;
}
</style>
