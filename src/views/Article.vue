<template>
  <Article v-if="isRootRoute"></Article>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Article from "../components/blog/Article.vue";
const route = useRoute();

const isRootRoute = computed(() => {
  return route.path === "/blog/article";
});
</script>
<style></style>
