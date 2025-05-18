<script setup>
import * as echarts from "echarts";
import { ref, onMounted, onUnmounted } from "vue"; // 增加onUnmounted

const charts = ref(null); // 使用const声明响应式引用
let myChart = null; // 保存图表实例

onMounted(() => {
  if (!charts.value) {
    console.error("图表容器未找到");
    return;
  }

  // 销毁旧的图表实例（防止重复创建）
  if (myChart) {
    myChart.dispose();
  }

  myChart = echarts.init(charts.value);

  const option = {
    title: {
      text: "专业课程（计算机相关）成绩",
      left: "center",
      bottom: "0px",
    },
    legend: {
      data: ["卷面成绩", "总成绩"],
      left: "0px",
      top: "0px",
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: "HTML5应用开发", max: 100, color: "#000" },
        { name: "JavaScript程序设计", max: 100, color: "#000" },
        { name: "数据库原理与应用", max: 100, color: "#000" },
        { name: "软件工程", max: 100, color: "#000" },
        { name: "计算机网络", max: 100, color: "#000" },
        { name: "计算机网络实验", max: 100, color: "#000" },
        { name: "	操作系统", max: 100, color: "#000" },
        { name: "算法分析与设计", max: 100, color: "#000" },
        { name: "Python程序设计", max: 100, color: "#000" },
        { name: "面向对象程序设计(C++)", max: 100, color: "#000" },
        { name: "程序设计基础(C语言)", max: 100, color: "#000" },
      ],
    },
    series: [
      {
        name: "卷面成绩与总成绩",
        type: "radar",
        data: [
          {
            value: [84, 91, 82, 80, 83, 97, 65, 86, 79, 69, 74],
            name: "卷面成绩",
          },
          {
            value: [86, 85, 82, 87, 90, 97, 82, 90, 86, 82, 84],
            name: "总成绩",
          },
        ],
      },
    ],
    tooltip: {
      trigger: "item", // 触发类型
      confine: true, // 限制在图表区域内
      backgroundColor: "rgba(50,50,50,0.7)", // 背景色
      borderColor: "#333", // 边框颜色
      textStyle: {
        color: "#fff", // 文字颜色
        fontSize: 14,
      },
      // 自定义提示内容格式
      formatter: function (params) {
        const indicator = params.name; // 当前科目名称
        const seriesName = params.seriesName; // 系列名称
        const value = params.value[params.dataIndex]; // 具体数值

        // 显示模板
        return `
          <strong>${indicator}</strong><br/>
          ${params.marker} ${seriesName}<br/>
          <span style="margin-left:20px">分数: ${value}分</span>
        `;
      },
    },
  };

  myChart.setOption(option);

  // 添加窗口resize监听
  window.addEventListener("resize", handleResize);
  handleResize(); // 初始调整
});

// 窗口调整处理函数
const handleResize = () => {
  myChart?.resize();
};

// 组件卸载时清理
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  myChart?.dispose();
});
</script>

<template>
  <div class="charts" ref="charts"></div>
</template>

<style scoped>
.charts {
  width: 38vw;
  height: 30vw;
  min-width: 300px;
  min-height: 300px;
  margin: 0 auto;
}
</style>
