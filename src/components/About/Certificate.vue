<template>
  <div class="table-container">
    <el-table
      :data="tableData"
      stripe
      style="width: 80%"
      class="centered-table"
    >
      <el-table-column
        prop="date"
        label="日期"
        width="150"
        :formatter="formatDate"
      />
      <el-table-column prop="name" label="证书" width="300" />
      <el-table-column prop="issuer" label="颁发机构" width="280" />

      <template #empty>
        <div class="empty-state">
          <el-icon :size="40" color="#909399">
            <document-remove />
          </el-icon>
          <p class="empty-text">{{ errorMessage || "暂无相关数据" }}</p>
          <el-button
            v-if="errorMessage"
            size="small"
            type="primary"
            @click="fetchData"
          >
            重新加载
          </el-button>
        </div>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { DocumentRemove } from "@element-plus/icons-vue";

interface Certificate {
  date: string;
  name: string;
  issuer: string;
  // 可扩展字段示例
  // level?: '国家级' | '省级'
  // validity?: number
}

// 响应式数据
const tableData = ref<Certificate[]>([]);
const loading = ref(false);
const errorMessage = ref("");

// 生命周期钩子
onMounted(() => {
  fetchData();
});

// 数据获取方法
const fetchData = async () => {
  try {
    loading.value = true;
    errorMessage.value = "";

    const response = await fetch("./data/certificate.json");

    if (!response.ok) {
      throw new Error(`数据请求失败 (${response.status})`);
    }

    const rawData = await response.json();

    // 数据清洗和验证
    tableData.value = rawData
      .filter((item: any) => item.date && item.name)
      .map((item: any) => ({
        date: item.date,
        name: item.name,
        issuer: item.issuer || "未知机构",
      }));
  } catch (err) {
    console.error("数据获取失败:", err);
    errorMessage.value = err instanceof Error ? err.message : "未知错误";
  } finally {
    loading.value = false;
  }
};

// 日期格式化
const formatDate = (row: Certificate) => {
  try {
    return new Date(row.date).toLocaleDateString("zh-CN");
  } catch {
    return "日期无效";
  }
};
</script>

<style scoped>
.table-container {
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center; /* 水平居中 */
  background: transparent !important; /* 移除背景色 */
}

/* 表格样式调整 */
:deep(.centered-table) {
  margin: 0 auto;
  box-shadow: none;
  background-color: transparent; /* 表格透明背景 */
}
/* 表头样式 */
.el-table__header th {
  background-color: #f8f9fa !important;
  font-weight: 500;
  color: #495057;
}

/* 单元格样式 */
.el-table__cell {
  background-color: transparent !important;
  border-bottom: 1px solid #dee2e6;
}
/* 斑马纹颜色调整 */
:deep(.el-table--striped .el-table__body tr.el-table__row--striped td) {
  background-color: none !important;
}

/* 表头样式优化 */
:deep(.el-table__header th) {
  background-color: #f5f7fa;
  font-weight: 600;
}
</style>
