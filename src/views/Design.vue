<template>
  <div class="main-container">
    <div v-if="loading" class="loading">加载中...</div>
    <ArtWork
      v-if="shuHongData.work"
      :title="shuHongData.name"
      :info="shuHongData.info"
      :works="shuHongData.work"
    />
    <ArtWork
      v-if="nongQuData.work"
      :title="nongQuData.name"
      :info="nongQuData.info"
      :works="nongQuData.work"
      class="twenty-four"
    />
    <Draws />
  </div>
</template>

<script setup>
import { ref } from "vue";
import ArtWork from "../components/work/Designs.vue";
import Draws from "../components/work/Draws.vue";

const loading = ref(true);
const shuHongData = ref({ work: [] });
const nongQuData = ref({ work: [] });

const fetchData = async () => {
  try {
    const response = await fetch("/data/design.json");
    const data = await response.json();

    // 安全数据赋值
    shuHongData.value = {
      name: data["蜀红记忆"]?.name || "",
      info: data["蜀红记忆"]?.info || "",
      work: data["蜀红记忆"]?.work || [],
    };

    nongQuData.value = {
      name: data["农趣绘时光"]?.name || "",
      info: data["农趣绘时光"]?.info || "",
      work: data["农趣绘时光"]?.work || [],
    };
  } catch (error) {
    console.error("数据加载失败:", error);
  } finally {
    loading.value = false;
  }
};

fetchData();
</script>

<style>
.loading {
  text-align: center;
  padding: 50px;
  color: #666;
}
</style>
