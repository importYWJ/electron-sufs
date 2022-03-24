<template>
  <div>
    <el-form>
      <el-form-item
        label="Activity name"
        prop="name"
        :rules="[
          {
            required: true,
            message: 'Please select Activity zone',
            trigger: 'change',
          },
        ]"
      >
        <el-input v-model="value"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const value = ref("");
    return { value };
  },
});
</script>

<style scoped></style>
