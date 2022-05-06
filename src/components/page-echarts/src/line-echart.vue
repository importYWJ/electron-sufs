<template>
  <div class="pie-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import BaseEchart from "@/base-ui/echart";
import { IDataType } from "../types";
import { predictData } from "../examples/predict-data";

export default defineComponent({
  components: {
    BaseEchart,
  },
  props: {
    lineData: Object as PropType<IDataType[]>,
  },
  setup(props) {
    let times: number[] = [];
    for (let i = 0; i < 24; i++) {
      times.push(i);
    }
    let oneHourPre: any[] = [];
    let oneHourReal: any[] = [];
    for (const index in predictData.predict) {
      let pre = predictData.predict[index][0].toFixed(2);
      let rea = predictData.rel[index][0].toFixed(2);
      oneHourPre.push(pre);
      oneHourReal.push(rea);
    }
    // oneHourRealData = oneHourReal
    // oneHourPreData = oneHourPre

    const options = computed(() => {
      return {
        title: {
          text: "预测与实际水深对比",
          textStyle: {
            fontSize: 13,
            color: "white",
          },
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["real", "predict"],
          textStyle: {
            // fontSize: 15,
            color: "white",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: times,
          axisLabel: {
            show: true,
            textStyle: {
              color: "white",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
            textStyle: {
              color: "white",
            },
          },
        },
        series: [
          {
            name: "real",
            type: "line",
            stack: "Total",
            data: oneHourReal,
          },
          {
            name: "predict",
            type: "line",
            stack: "Total",
            data: oneHourPre,
          },
        ],
      };
    });
    return {
      options,
    };
  },
});
</script>

<style scoped></style>
