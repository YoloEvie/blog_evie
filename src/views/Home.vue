<template>
  <Banner></Banner>
  <Mine></Mine>
  <MessageBoard></MessageBoard>
  <Work></Work>
  <BlogMain></BlogMain>
</template>
<script setup>
import Banner from "../components/home/Banner.vue";
import Mine from "../components/home/Mine.vue";
import MessageBoard from "../components/home/MessageBoard.vue";
import Work from "../components/home/Work.vue";
import { useRoute } from "vue-router";
import BlogMain from "../components/home/BlogMain.vue";
</script>
