<template>
  <Technique :items="movieData" />
  <div class="more">
    <a
      href="https://blog.csdn.net/2201_75883040?spm=1000.2115.3001.5343"
      target="_blank"
      >查看更多</a
    >
  </div>
</template>

<script setup>
import { ref } from "vue"; // 添加响应式API
import Technique from "../components/blog/Technique.vue";

const movieData = ref([]); // 使用ref创建响应式引用

fetch("/data/tech-blogs.json")
  .then((res) => res.json())
  .then((res) => {
    movieData.value = res; // 更新响应式数据
  });
</script>
<style scoped>
.more {
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  margin-top: 20px;
  color: #666;
}
.more:hover {
  color: #000;
  cursor: pointer;
  background-color: #f3edd1;
}
.more a {
  color: #666;
  text-decoration: none;
}
</style>
