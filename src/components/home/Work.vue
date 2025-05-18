<template>
  <div class="container">
    <h2>作品展示</h2>

    <a-card hoverable style="width: 300px" class="design-box work-box">
      <template #cover>
        <img alt="example" src="/design/d000.jpg" />
      </template>
      <template #actions>
        <router-link to="/works/design" class="nav-link nav-p">
          <ArrowRightOutlined />
        </router-link>
      </template>
      <a-card-meta title="设计类作品" description="海报设计|UI设计|手绘作品">
      </a-card-meta>
    </a-card>

    <a-card hoverable style="width: 300px" class="photography-box work-box">
      <template #cover>
        <img
          alt="example"
          src="/photo/f003.JPG"
          style="width: 300px; height: 425px"
        />
      </template>
      <template #actions>
        <router-link to="/works/photo" class="nav-link nav-p">
          <ArrowRightOutlined />
        </router-link>
      </template>
      <a-card-meta title="摄影类作品" description="静物摄影|花卉摄影">
      </a-card-meta>
    </a-card>
  </div>
</template>
<script setup>
import { ArrowRightOutlined } from "@ant-design/icons-vue";
</script>
<style scoped>
.container {
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
h2 {
  width: 100%;
}
</style>
