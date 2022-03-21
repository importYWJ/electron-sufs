<template>
  <div>
    <template v-if="type === 'datepicker'">
      <el-date-picker
        v-bind="options"
        style="width: 100%"
        v-model="value"
        @change="handleChange"
      ></el-date-picker>
    </template>
    <template v-else-if="type === 'timepicker'">
      <el-time-picker
        v-bind="options"
        style="width: 100%"
        v-model="value"
        @change="handleChange"
      ></el-time-picker>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    options: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  emits: ["change"],
  setup(props, { emit }) {
    const value = ref("");
    const handleChange = (value: any) => {
      emit("change", value);
    };
    return { value, handleChange };
  },
});
</script>

<style scoped></style>
