<template>
  <el-menu ellipsis class="el-menu-popper-demo" mode="horizontal">
    <!-- LOGO -->
    <el-menu-item>
      <div class="block">
        <img src="./nav-imgs/logo.png" alt="logo" />
      </div>
    </el-menu-item>
    <!-- 导航栏 -->
    <el-menu-item index="1">
      <router-link to="/" class="nav-link">首页</router-link>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <span class="nav-link nav-link-work">作品</span>
        <!-- <router-link to="/works" class="nav-link">作品</router-link> -->
      </template>
      <!-- <el-menu-item index="2-1" class="nav-item">
        <router-link to="/works/web" class="nav-link nav-p"
          >前端开发类</router-link
        >
      </el-menu-item> -->
      <el-menu-item index="2-2" class="nav-item">
        <router-link to="/works/design" class="nav-link nav-p"
          >设计类</router-link
        >
      </el-menu-item>
      <el-menu-item index="2-3" class="nav-item">
        <router-link to="/works/photo" class="nav-link nav-p"
          >摄影类</router-link
        >
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3" :popper-offset="8">
      <template #title>
        <span class="nav-link nav-link-work">博客</span>

        <!-- <router-link to="/blog" class="nav-link">博客</router-link> -->
      </template>
      <el-menu-item index="3-1" class="nav-item">
        <router-link to="/blog/technique" class="nav-link nav-p">
          开发类
        </router-link>
      </el-menu-item>
      <el-menu-item index="3-2" class="nav-item">
        <router-link to="/blog/article" class="nav-link nav-p"
          >生活</router-link
        >
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="4" class="nav-item">
      <router-link to="/about" class="nav-link">关于我</router-link>
    </el-menu-item>
    <!-- 登录注册 -->
    <el-sub-item>
      <el-button color="#e24b2a" plain class="nav-btn">
        <router-link to="/login" class="nav-link nav-link-to">登录</router-link>
      </el-button>
      <el-button color="#e24b2a" plain class="nav-btn">
        <router-link to="/register" class="nav-link nav-link-to"
          >注册</router-link
        >
      </el-button>
    </el-sub-item>
  </el-menu>
</template>
<script setup>
// logo位置存放
</script>
<style>
.nav-link {
  font-size: 20px;
  text-decoration: none;
  color: #0f1616;
}
.nav-p {
  font-size: 16px;
}

.nav-item:hover .nav-link {
  color: #e24b2a !important;
}
.nav-link:hover {
  color: #e24b2a !important;
}
.nav-link-work:hover {
  color: #0f1616 !important;
}
.nav-link-to {
  color: #e24b2a !important;
}
.nav-btn {
  border: none !important;
}
.nav-btn:hover .nav-link-to {
  color: #fffae4 !important;
}
/* 修改默认样式 */
.el-menu--horizontal {
  justify-content: space-around;
  align-items: center;
}
.el-menu--horizontal {
  --el-menu-text-color: #0f1616;
  --el-menu-hover-text-color: #e24b2a;
  --el-menu-active-color: #e24b2a;
  --el-menu-bg-color: #fffae4;
  --el-menu-hover-bg-color: #f3edd1;
  --el-menu-border-color: #dbd6be;
}
.block {
  width: 75px;
  height: 75px;
}
.block img {
  /* width: 100%; */
  height: 100%;
  object-fit: cover;
}
</style>
