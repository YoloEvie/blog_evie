<template>
    <el-card shadow="never">
        <h3>很高兴遇见你</h3>
        <div 
            ref="wall"
            class="wall"
            @click="handleWallClick"
        >
            <div
                v-for="wish in combinedWishes"
                :key="wish.id"
                class="wish"
                :style="wishStyle(wish)"
            >
                <div class="content-wrapper">
                    <div class="mission-text">{{ wish.message || wish.mission }}</div>
                    <div class="info-footer">
                        <span class="user">{{ wish.name }}</span>
                        <span class="date">{{ wish.date }}</span>
                    </div>
                </div>
            </div>
        </div>

        <el-dialog
            v-model="showDialog"
            title="留下你的祝福"
            width="400px"
            :close-on-click-modal="false"
        >
            <el-form :model="formData" :rules="rules">
                <el-form-item label="昵称" prop="name" required>
                    <el-input v-model="formData.name" placeholder="你的称呼" />
                </el-form-item>
                <el-form-item label="留言" prop="message" required>
                    <el-input
                        v-model="formData.message"
                        type="textarea"
                        :rows="3"
                        placeholder="写下你想说的话..."
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="cancelSubmit">取消</el-button>
                <el-button 
                    type="primary" 
                    @click="submitWish"
                    :disabled="!formData.name || !formData.message"
                >
                    提交
                </el-button>
            </template>
        </el-dialog>
    </el-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const showDialog = ref(false)
const formData = ref({
  name: '',
  message: ''
})
const rules = {
  name: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  message: [{ required: true, message: '请输入留言内容', trigger: 'blur' }]
}
const presetData = ref([])
const dynamicWishes = ref([])
const wall = ref(null)
const clickPosition = ref({ x: 0, y: 0 })

const getRandomPosition = () => {
  if (!wall.value) return { x: 0, y: 0 }
  const wallRect = wall.value.getBoundingClientRect()
  const maxX = Math.max(0, wallRect.width - 160)
  const maxY = Math.max(0, wallRect.height - 160)
  return {
    x: Math.floor(Math.random() * maxX),
    y: Math.floor(Math.random() * maxY)
  }
}

// const getPastelColor = () => {
//   const r = Math.floor((Math.random() * 127) + 127)
//   const g = Math.floor((Math.random() * 127) + 127)
//   const b = Math.floor((Math.random() * 127) + 127)
//   return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
// }

const fetchData = async () => {
    try {
        const response = await fetch("./data/message.json")
        const data = await response.json()
        presetData.value = data.map((item, index) => ({
            ...item,
            id: `preset-${index}-${Date.now()}`,
            ...getRandomPosition(),
            color: "#556f59"
        }))
    } catch (error) {
        console.error('数据加载失败:', error)
    }
}

const combinedWishes = computed(() => [
    ...presetData.value,
    ...dynamicWishes.value
])

const handleWallClick = (event) => {
  if (!wall.value) return
  
  const rect = wall.value.getBoundingClientRect()
  clickPosition.value = {
    x: event.clientX - rect.left - 80,
    y: event.clientY - rect.top - 80
  }
  showDialog.value = true
}

const submitWish = () => {
  dynamicWishes.value.push({
    id: `dynamic-${Date.now()}`,
    name: formData.value.name.trim(),
    message: formData.value.message.trim(),
    date: new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }),
    x: clickPosition.value.x,
    y: clickPosition.value.y,
    // color: getPastelColor()
    color: "#556f59"
  })
  cancelSubmit()
}

const cancelSubmit = () => {
  formData.value = { name: '', message: '' }
  showDialog.value = false
}

const wishStyle = (wish) => ({
    top: `${wish.y}px`,
    left: `${wish.x}px`,
    backgroundColor: wish.color,
    color: "#fff"
})

onMounted(() => {
    fetchData()
    window.addEventListener('resize', () => {
        presetData.value = presetData.value.map(item => ({
            ...item,
            ...getRandomPosition()
        }))
        dynamicWishes.value = dynamicWishes.value.map(item => ({
            ...item,
            ...getRandomPosition()
        }))
    })
})
</script>

<style scoped>
.el-card {
    margin-top: 35px;
    --el-card-border-color: #f3edd1;
    --el-card-border-radius: 4px;
    --el-card-padding: 20px;
    --el-card-bg-color: #f3edd1;
}

.wall {
    width: 100%;
    height: 400px;
    margin: 20px auto;
    border-radius: 5px;
    position: relative;
    cursor: pointer;
    overflow-x: auto;
}

.operation {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
}

.wish {
    width: 160px;
    /* height: 160px; 固定尺寸保证布局 */
    padding: 15px;
    margin: 5px;
    border-radius: 10px;
    box-shadow: 3px 2px 10px rgb(190, 190, 190);
    position: absolute;
    display: flex;
    flex-direction: column;
    cursor: default;
}

.mission-text {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 1.4;
}

.info-footer {
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    opacity: 0.8;
}
</style>