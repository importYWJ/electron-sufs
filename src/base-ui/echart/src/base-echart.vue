<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType, watchEffect } from "vue";
import useEchart from "../hooks/useEchart";
// import * as echarts from 'echarts'
import { EChartsOption } from "echarts";

export default defineComponent({
  props: {
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "360px",
    },
    options: {
      type: Object as PropType<EChartsOption>,
    },
  },
  setup(props) {
    const echartDivRef = ref<HTMLElement>();
    // 直接写还未绑定上
    // const echartInstance = echarts.init(echartDivRef.value)
    onMounted(() => {
      const { setOptions } = useEchart(echartDivRef.value!);
      watchEffect(() => {
        setOptions(props.options as EChartsOption);
      });
    });
    return {
      echartDivRef,
    };
  },
});
</script>

<style scoped></style>
