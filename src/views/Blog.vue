<template>
  <BlogMain v-if="route.name === 'blog'"></BlogMain>
  <router-view></router-view>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import BlogMain from "../components/blog/BlogMain.vue";
const route = useRoute();
</script>
