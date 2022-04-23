<template>
  <div class="radar-build">
    <el-row :gutter="20">
      <el-col :span="12">
        <wj-card title="雷达因子">
          <map-echart height="650px"></map-echart>
        </wj-card>
      </el-col>
      <el-col :span="12">
        <wj-card title="降雨反演结果">
          <map-echart height="650px"></map-echart>
        </wj-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <wj-card title="雷达参数">
          <!-- <div class="split">雷达因子</div>
          <wj-form v-bind="radarConfig" v-model="formData" :multiple="true" /> -->
          <div class="split">时间范围</div>
          <wj-form
            v-bind="detailTimeConfig"
            v-model="formData"
            :multiple="true"
          />
          <el-row>
            <el-col>
              <div class="split">时间分辨率</div>
              <wj-input
                v-bind="timeResolutionConfig"
                v-model="formData"
              ></wj-input>
            </el-col>
          </el-row>
          <el-button type="primary" @click="btnShowRadar">
            查看雷达因子
          </el-button>
        </wj-card>
      </el-col>
      <el-col :span="12">
        <wj-card title="降雨文件">
          <div class="split">栅格分辨率</div>
          <wj-input v-bind="ncResolutionConfig" v-model="formData"></wj-input>
          <div class="split">输出结果</div>
          <wj-input v-bind="outputConfig" v-model="formData"></wj-input>
          <el-button type="primary">导出降雨文件</el-button>
        </wj-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import WjCard from "@/base-ui/card";
import WjForm from "@/base-ui/form";
import WjInput from "@/base-ui/input";
import { MapEchart } from "@/components/page-echarts";
import { useStore } from "@/store";
import {
  radarConfig,
  detailTimeConfig,
  timeResolutionConfig,
  ncResolutionConfig,
  outputConfig,
} from "./types/radar_build.config";

export default defineComponent({
  components: {
    WjForm,
    WjInput,
    WjCard,
    MapEchart,
  },
  setup() {
    const formOriginData: any = {};
    const formData = ref(formOriginData);
    const store = useStore();
    const btnShowRadar = () => {
      const radarList = new FormData();
      for (const item in formData.value) {
        radarList.append(item, formData.value[item]);
      }
      store.dispatch("radarModule/radarSelectAction", {
        pageUrl: "/radar/select",
        radarList: radarList,
      });
    };
    return {
      radarConfig,
      detailTimeConfig,
      timeResolutionConfig,
      ncResolutionConfig,
      outputConfig,
      formData,
      btnShowRadar,
    };
  },
});
</script>

<style scoped>
.split {
  height: 35px;
  text-align: left;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 15px;
  color: #575862;
  background-color: #ebebeb;
  padding-left: 20px;
  margin: 0 5px;
}
.radar-build {
  width: 100%;
  /* display: flex;
  justify-content: space-between; */
}
.el-button {
  float: right;
  margin-bottom: 10px;
}
</style>
