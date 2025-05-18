<template>
  <div :class="['red-box', customClass]">
    <h2>{{ title }}</h2>
    <div class="red-info">
      <p class="red-info-text">{{ info }}</p>
    </div>

    <div class="container">
      <div
        v-for="work in worksWithState"
        :key="work.id"
        class="work-box"
        @click.stop="toggleInfo(work)"
      >
        <img
          v-show="!work.showInfo"
          :src="work.src"
          :alt="work.name"
          class="work-image"
        />

        <transition name="fade">
          <div v-if="work.showInfo" class="info-box">
            <div class="info-content">
              <h3>{{ work.name }}</h3>
              <p>{{ work.info || "暂无详细介绍" }}</p>
            </div>
            <p class="action-tip">点击其他区域返回</p>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  title: String,
  info: String,
  works: {
    type: Array,
    default: () => [],
  },
  customClass: String,
});

// 响应式状态管理
const worksWithState = ref([]);

// 初始化状态
const initWorksState = (works) => {
  return works.map((work) => ({
    ...work,
    showInfo: false,
  }));
};

// 监听works变化
watch(
  () => props.works,
  (newVal) => {
    worksWithState.value = initWorksState(newVal);
  },
  { immediate: true }
);

// 切换信息显示
const toggleInfo = (targetWork) => {
  worksWithState.value = worksWithState.value.map((work) => ({
    ...work,
    showInfo: work.id === targetWork.id ? !work.showInfo : false,
  }));
};
</script>

<style scoped>
/* 添加过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.container {
  display: grid;
  grid-template-columns: repeat(3, 300px);
  justify-content: center;
  gap: 30px 200px;
  padding: 20px;
}

.work-box {
  width: 300px;
  height: 425px;
  border: 1px solid #ddd;
  cursor: pointer;
  position: relative;
  border-radius: 5px;
}

.work-image {
  width: 300px;
  border-radius: 5px;
}

.info-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f3edd1;
}

.info-box h3 {
  margin-bottom: 15px;
  color: #333;
}

.info-box p {
  color: #666;
  font-size: 14px;
}
.info-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
}

.info-content {
  flex: 1;
  overflow-y: auto; /* 允许内容滚动 */
  margin: 15px 0;
}

.info-content p {
  color: #0f1616;
  font-size: 14px;
  line-height: 1.6;
  text-align: justify;
}

.action-tip {
  color: #0f1616;
  font-size: 12px;
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px solid #eee;
}
.work-box {
  position: relative; /* 为伪元素提供定位基准 */
  overflow: hidden; /* 隐藏溢出内容 */
  transition: transform 0.3s ease; /* 添加悬停动效 */
}

.work-box:hover {
  transform: translateY(-5px); /* 悬停时轻微上移 */
}

.work-box:hover::after {
  content: "点击查看更多";
  position: absolute;
  bottom: -30px; /* 初始位置在卡片下方 */
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  transition: all 0.3s ease;
}

.work-box:hover::after {
  bottom: 15px; /* 悬停时上移显示 */
  opacity: 1;
}

.work-image {
  transition: transform 0.3s ease;
}
.work-box:hover .work-image {
  transform: scale(1.03);
}
.red-info {
  height: 100px;
  background-color: #f3edd1;
  padding: 15px 5px;
  border-radius: 5px;
}
.red-info p {
  line-height: 35px;
}
</style>
