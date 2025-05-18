<template>
  <main>
    <div class="flower-text">
      <h1>花卉摄影</h1>
      <p>
        这组摄影作品是对春天的诗意礼赞。镜头之下，樱花于古朴瓦当旁、于朦胧树影间，或洁白素雅，或粉瓣娇柔，轻盈绽放，传递着春的浪漫与温柔；马蹄莲在石栏边亭亭玉立，洁白苞片宛如精致的玉盏，金黄花蕊吐露着春的希望；杜鹃花带露娇艳，紫色花瓣似云霞绚烂，彰显着春的热烈与蓬勃。每一幅画面都捕捉到了春日花卉的独特神韵，它们共同勾勒出一幅五彩斑斓、生机盎然的春日画卷，诉说着春天的灵动与美好，让人在繁花间感知春的魅力与生命的蓬勃力量。
      </p>
    </div>
    <div class="flower">
      <div v-for="item in data.flower" :key="item.id" class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <a-card hoverable>
              <template #cover>
                <img :src="item.src" :alt="item.theme" class="card-image" />
              </template>
            </a-card>
          </div>
          <div class="flip-card-back">
            <a-card>
              <a-card-meta :description="item.intro" style="padding: 20px" />
            </a-card>
          </div>
        </div>
      </div>
    </div>
    <div class="dimoo-text">
      <h1>静物摄影</h1>
      <p>
        这组摄影作品聚焦于玩偶摆件Dimoo。拍摄时巧妙选取木质窗台、编织垫、绿植以及仙人掌等多样背景，通过不同的构图与光影运用，展现出玩偶在多样场景下的独特韵味，营造出温馨、治愈且充满童趣的氛围，传递出对生活中小美好与纯真事物的珍视。
      </p>
    </div>
    <div class="dimoo">
      <div v-for="item in data.dimoo" :key="item.id" class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <a-card hoverable>
              <template #cover>
                <img
                  :src="getImageUrl(item.src)"
                  :alt="item.theme"
                  class="card-image"
                />
              </template>
            </a-card>
          </div>
          <div class="flip-card-back">
            <a-card>
              <a-card-meta :description="item.intro" style="padding: 20px" />
            </a-card>
          </div>
        </div>
      </div>
    </div>
  </main>
  <router-view />
</template>

<script setup>
import { ref, onMounted } from "vue";

// 响应式数据
const data = ref({
  flower: [],
  dimoo: [],
});
const loading = ref(true);
const error = ref(null);

// 数据获取函数
const fetchData = async () => {
  try {
    const response = await fetch("./data/photo.json");
    if (!response.ok) throw new Error("数据加载失败");
    const result = await response.json();
    data.value = result;
  } catch (err) {
    error.value = err.message || "发生未知错误";
  } finally {
    loading.value = false;
  }
};
// 添加图片路径处理方法
const getImageUrl = (path) => {
  // 适用于Vite的静态资源处理
  return new URL(path, import.meta.url).href;
};

// 组件挂载时获取数据
onMounted(() => {
  fetchData();
});
</script>

<style scoped>
main {
  width: 100%;
  padding: 20px;
  flex-wrap: wrap;
  gap: 30px;
}

.flower,
.dimoo {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  justify-content: center;
  gap: 20px;
}

.flip-card {
  width: 300px;
  /* height: 380px; */
  perspective: 1000px;
  cursor: pointer;
  margin: 10px;
}
main {
  width: 100%;
  padding: 20px;
  flex-wrap: wrap;
  gap: 30px;
}

.flip-card {
  width: 300px;
  height: 300px; /* 包含卡片meta内容的高度 */
  perspective: 1000px;
  cursor: pointer;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 1.5s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.flip-card-back {
  transform: rotateY(180deg);
}

.card-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px !important;
}

/* 调整Ant Design卡片样式 */
.flip-card-front :deep(.ant-card),
.flip-card-back :deep(.ant-card) {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.flip-card-front :deep(.ant-card-body),
.flip-card-back :deep(.ant-card-body) {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.flower-text,
.dimoo-text {
  width: 90%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f3edd1;
  border-radius: 10px;
}
/* .flower-text p,
.dimoo-text p {
  padding: 20px;
} */
</style>
