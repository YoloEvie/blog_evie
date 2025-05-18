<template>
  <el-card shadow="hover" class="profile-card">
    <el-container class="layout-container">
      <el-header>个人简介</el-header>
      <el-container>
        <el-aside width="200px">
          <img
            src="./Mine/mine.jpg"
            alt=""
            style="width: 100px; height: 100px; object-fit: cover"
          />
        </el-aside>
        <el-container>
          <el-main>
            <div class="info-container">
              <el-row :gutter="20" class="info-row">
                <el-col :span="6" class="label-col">
                  <span class="label-text">姓名</span>
                </el-col>
                <el-col :span="18" class="content-col"> 赖馨怡 </el-col>
              </el-row>

              <el-row :gutter="20" class="info-row">
                <el-col :span="6" class="label-col">
                  <span class="label-text">电话</span>
                </el-col>
                <el-col :span="18" class="content-col"> 13404009700 </el-col>
              </el-row>

              <el-row :gutter="20" class="info-row">
                <el-col :span="6" class="label-col">
                  <span class="label-text">邮箱</span>
                </el-col>
                <el-col :span="18" class="content-col">
                  1719854949@qq.com
                </el-col>
              </el-row>

              <el-row :gutter="20" class="info-row">
                <el-col :span="6" class="label-col">
                  <span class="label-text">就读学校</span>
                </el-col>
                <el-col :span="18" class="content-col"> 成都锦城学院 </el-col>
              </el-row>

              <el-row :gutter="20" class="info-row">
                <el-col :span="6" class="label-col">
                  <span class="label-text">专业</span>
                </el-col>
                <el-col :span="18" class="content-col">
                  数字媒体技术|前端开发方向
                </el-col>
              </el-row>

              <el-row :gutter="20" class="info-row">
                <el-col :span="6" class="label-col">
                  <span class="label-text">居住地</span>
                </el-col>
                <el-col :span="18" class="content-col"> 成都 </el-col>
              </el-row>
            </div>
          </el-main>
          <el-footer>
            <h3>专业课程</h3>
            <div style="display: flex; gap: 8px; flex-wrap: wrap">
              <el-tag
                v-for="(course, index) in courses.MajorCourses"
                :key="index"
                type="info"
                >{{ course.CourseName }}</el-tag
              >
            </div>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </el-card>
</template>
<script setup>
import { ref, onMounted } from "vue";
const courses = ref({ MajorCourses: [] });
const isLoading = ref(true);

// 在组件挂载时获取数据
onMounted(async () => {
  try {
    const response = await fetch("./data/course.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    courses.value = data;
  } catch (error) {
    console.error("数据获取失败:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>
<style scoped>
/* 卡片整体布局 */
.profile-card {
  --el-card-bg-color: none;
  --el-card-border-color: none;
  width: 100%;
  /* max-width: 1200px; */
  /* 控制最大宽度 */
  margin: 20px auto;
  /* 水平居中 */
  /* min-height: 500px; */
  /* 最小高度 */
}

/* 布局容器 */
.layout-container {
  width: 80%;
  height: 100%;
  margin: 0 auto;
  /* min-height: 500px; */
  /* 与卡片高度一致 */
}

/* 头部样式 */
.el-header {
  height: 60px;
  line-height: 60px;
  font-size: 1.5rem;
  border-bottom: 1px solid var(--el-border-color-lighter);
}

/* 侧边栏调整 */
.el-aside {
  width: 200px !important;
  /* 强制侧边栏宽度 */
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid var(--el-border-color-lighter);
}

/* 主内容区 */
.el-main {
  padding: 30px;
  /* min-height: 400px; */
  /* 保证内容区高度 */
}

/* 底部课程 */
.el-footer {
  margin-bottom: 20px;
  padding: 20px 30px;
  border-top: 1px solid var(--el-border-color-lighter);
}

.info-container {
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 4px;
}

.info-row {
  padding: 12px 16px;
  border-bottom: 1px solid var(--el-border-color-lighter);

  &:last-child {
    border-bottom: none;
  }
}

.label-col {
  display: flex;
  align-items: center;
  color: var(--el-text-color-secondary);
  font-weight: 500;
}

.content-col {
  display: flex;
  align-items: center;
}

.label-text {
  &::after {
    content: ":";
    margin-left: 2px;
  }
}
</style>
