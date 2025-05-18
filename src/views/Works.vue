<template>
  <router-view />
</template>

<script>
export default {
  methods: {
    goToRoute(type) {
      const routes = {
        dev: "/development",
        design: "/design",
        photo: "/photography",
      };
      this.$router.push(routes[type]);
    },
  },
};
</script>

<style scoped>
main {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 20px;
  flex-wrap: wrap;
  gap: 30px;
}

.flip-card {
  width: 300px;
  height: 380px; /* 包含卡片meta内容的高度 */
  perspective: 1000px;
  cursor: pointer;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
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
</style>
