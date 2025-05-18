<template>
  <div class="article-detail">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading">加载中...</div>

    <!-- 正常显示 -->
    <div v-else-if="article">
      <h1>{{ article.title }}</h1>
      <div class="meta">
        <time>{{ formatDate(article.time) }}</time>
        <span v-if="article.imgs.length" class="photo-count">
          {{ article.imgs.length }}张照片
        </span>
      </div>

      <!-- 图片展示区域 -->
      <div class="image-grid" v-if="article.imgs.length">
        <div
          v-for="(img, index) in article.imgs"
          :key="index"
          class="grid-item"
        >
          <img
            :src="img"
            :alt="`${article.title}照片${index + 1}`"
            class="article-image"
            loading="lazy"
          />
        </div>
      </div>

      <!-- Markdown内容渲染区域 -->
      <div class="markdown-content" v-if="htmlContent">
        <div v-html="htmlContent"></div>
      </div>

      <!-- 原始内容作为后备 -->
      <div class="content" v-else>
        {{ article.content }}
      </div>

      <router-link to="/blog/article" class="back-link">返回列表</router-link>
    </div>

    <!-- 文章不存在 -->
    <div v-else>
      <h1>文章不存在</h1>
      <router-link to="/blog/article" class="back-link">返回列表</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { Picture } from "@element-plus/icons-vue";

const route = useRoute();
const articles = ref([]);
const loading = ref(true);
const htmlContent = ref("");

// 配置Marked
marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return require("highlight.js").highlightAuto(code).value;
  },
});

// 获取文章数据
const fetchArticles = async () => {
  try {
    const response = await fetch("./data/article.json");
    if (!response.ok) throw new Error("数据加载失败");
    articles.value = await response.json();
  } catch (error) {
    console.error("数据加载失败:", error);
  } finally {
    loading.value = false;
  }
};

// 计算当前文章
const article = computed(() => {
  return articles.value.find((a) => a.id === route.params.id);
});

// 处理Markdown内容
const processContent = async () => {
  if (!article.value) return;

  // 如果是Markdown文件路径
  if (article.value.content.startsWith("./md/")) {
    try {
      const response = await fetch(article.value.content);
      if (!response.ok) throw new Error("Markdown加载失败");
      const markdown = await response.text();
      htmlContent.value = DOMPurify.sanitize(marked.parse(markdown));
    } catch (error) {
      console.error("Markdown加载失败:", error);
      htmlContent.value = "";
    }
  } else {
    // 直接渲染纯文本内容
    htmlContent.value = DOMPurify.sanitize(marked.parse(article.value.content));
  }
};

// 监听文章变化
watch(article, (newVal) => {
  if (newVal) processContent();
});

// 日期格式化方法
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("zh-CN", options);
};

onMounted(async () => {
  await fetchArticles();
  processContent();
});
</script>

<style scoped>
.image-grid {
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  margin: 30px 0;
}

.grid-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  aspect-ratio: 4/3;
  transition: transform 0.3s ease;
}

.grid-item:hover {
  transform: scale(1.02);
  z-index: 1;
}

.article-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.no-images {
  margin: 30px 0;
  text-align: center;
  padding: 40px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.empty-box {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: #909399;
}

.photo-count {
  margin-left: 15px;
  color: #42b983;
  font-size: 0.9em;
}

@media (max-width: 768px) {
  .image-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .grid-item {
    aspect-ratio: 1/1;
  }
}

@media (max-width: 480px) {
  .image-grid {
    grid-template-columns: 1fr;
  }
}

.loading {
  text-align: center;
  padding: 20px;
  color: #666;
}

.article-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.meta {
  color: #666;
  margin-bottom: 30px;
}

.content {
  line-height: 1.6;
  font-size: 1.1em;
  margin-bottom: 30px;
  white-space: pre-wrap;
}

.back-link {
  display: inline-block;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.back-link:hover {
  background-color: #3aa876;
}
/* 新增Markdown内容样式 */
.markdown-content {
  line-height: 1.8;
  font-size: 16px;
  color: #333;
}

.markdown-content >>> h1,
.markdown-content >>> h2,
.markdown-content >>> h3 {
  color: #2c3e50;
  margin: 1.2em 0 0.8em;
}

.markdown-content >>> p {
  margin: 1em 0;
}

.markdown-content >>> a {
  color: #42b983;
  text-decoration: none;
}

.markdown-content >>> code {
  background-color: #f5f7fa;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
}

.markdown-content >>> pre {
  background-color: #f8f9fa;
  padding: 1em;
  border-radius: 6px;
  overflow-x: auto;
  margin: 1.5em 0;
}

.markdown-content >>> blockquote {
  border-left: 4px solid #42b983;
  margin: 1em 0;
  padding: 0.5em 1em;
  color: #666;
  background-color: #f8f9fa;
}
</style>
