<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
      </div>
    </template>
    <div class="item">
      <slot></slot>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      default: "Title",
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.card-header {
  display: flex;
  justify-content: space-between; // 两侧对齐
  align-items: center;
  height: 30px;
}

.item {
  margin-bottom: 10px;
}
</style>
