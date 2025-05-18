<template>
  <h2>博客</h2>
  <el-table
    :data="tableData"
    style="width: 100%"
    @row-click="handleRowClick"
    :row-class-name="tableRowClassName"
  >
    <el-table-column prop="date" label="日期" width="180" />
    <el-table-column prop="articleTitle" label="文章标题" width="180" />
    <el-table-column prop="summary" label="概要" />
  </el-table>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();

// 处理行点击事件
const handleRowClick = (row: any) => {
  router.push(row.path); // 使用文章路径进行跳转
};

// 添加行样式
const tableRowClassName = () => {
  return "clickable-row";
};
</script>

<style scoped>
h2 {
  margin-top: 30px;
}
/* 基础表格样式 */
.el-table {
  width: 80%;
  border-radius: 5px;
  margin-top: 30px;
}

/* 可点击行样式 */
:deep(.clickable-row) {
  cursor: pointer;

  &:hover > td {
    background-color: #f5f7fa !important;
  }

  &:active > td {
    background-color: #ebeef5 !important;
  }
}
</style>
