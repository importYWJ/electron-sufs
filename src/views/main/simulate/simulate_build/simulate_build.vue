<template>
  <simulate-build />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SimulateBuild from "@/components/simulate-build";

export default defineComponent({
  components: {
    SimulateBuild,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
