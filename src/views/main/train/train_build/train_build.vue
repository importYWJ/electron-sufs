<template>
  <wj-map v-bind="mapConfig"></wj-map>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WjMap from "@/base-ui/arcgis-map";
import { mapConfig } from "../train_build/config/train.config";

export default defineComponent({
  components: {
    WjMap,
  },
  setup() {
    return { mapConfig };
  },
});
</script>

<style scoped lang="less"></style>
