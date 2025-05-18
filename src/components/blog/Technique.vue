<template>
  <a-list
    item-layout="vertical"
    size="large"
    :pagination="pagination"
    :data-source="items"
  >
    <template #renderItem="{ item }">
      <a-list-item :key="item.url">
        <template #actions>
          <!-- 根据数据字段动态显示 -->
          <span>
            <StarOutlined style="margin-right: 8px" />
            {{ item.star }}
          </span>
          <span>
            <LikeOutlined style="margin-right: 8px" />
            {{ item.like }}
          </span>
          <span>
            <MessageOutlined style="margin-right: 8px" />
            {{ item.message }}
          </span>
        </template>
        <template #extra>
          <!-- 动态绑定图片地址 -->
        </template>
        <a-list-item-meta :description="item.date">
          <template #title>
            <a :href="item.url" target="_blank">{{ item.title }}</a>
            <!-- <router-link
              :to="{
                name: 'technique-detail',
                params: { id: item.id },
              }"
            >
              {{ item.title }}
            </router-link> -->
          </template>
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" />
          </template>
        </a-list-item-meta>
        {{ item.content }}
      </a-list-item>
    </template>
  </a-list>
</template>

<script lang="ts" setup>
import {
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
} from "@ant-design/icons-vue";

defineProps({
  items: {
    type: Array as () => Array<{
      title: string;
      content: string;
      date: string;
      url: string;
      star: string;
      like: string;
      message: string;
      img: string;
    }>,
    required: true,
  },
});

const pagination = {
  onChange: (page: number) => console.log(page),
  pageSize: 3,
};
</script>
