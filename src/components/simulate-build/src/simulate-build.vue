<template>
  <div class="simulate_build">
    <el-scrollbar :height="scrollheight" always>
      <!-- 选择模型 + 计算模式 -->
      <div class="split">基础信息</div>
      <wj-form v-bind="basicInfoConfig" v-model="formData" />
      <!-- 降雨数据 -->
      <div class="split">降雨数据配置</div>
      <el-radio-group v-model="rainfallStyle">
        <el-radio label="rainfall">降雨时序文件</el-radio>
        <wj-input
          v-bind="rainfallConfig"
          v-model="formData"
          :disable="rainfallStyle === 'rainfall' ? false : true"
        />
        <el-radio label="dynamic_rain_file">
          网络通用数据格式文件(.nctCDF)
        </el-radio>
        <wj-input
          v-bind="dynamic_rain_fileConfig"
          v-model="formData"
          :disable="rainfallStyle === 'dynamic_rain_file' ? false : true"
        />
      </el-radio-group>
      <!-- 蒸发速率 -->
      <div class="split split-add">蒸发速率</div>
      <el-radio-group v-model="evaporateStyle">
        <el-radio label="file">蒸发速率文件</el-radio>
        <wj-input
          v-bind="evaporation_fileConfig"
          v-model="formData"
          :disable="evaporateStyle === 'file' ? false : true"
        />
        <el-radio label="uniform">通用蒸发速率</el-radio>
        <wj-input
          v-bind="evaporation_uniformConfig"
          v-model="formData"
          :disable="evaporateStyle === 'uniform' ? false : true"
        />
      </el-radio-group>
      <!-- 模拟时间 -->
      <div class="split">模拟时间</div>
      <el-radio-group v-model="simTimeStyle">
        <el-radio label="totalTime">总体时长</el-radio>
        <wj-input
          v-bind="totalTimeConfig"
          v-model="formData"
          :disable="simTimeStyle === 'totalTime' ? false : true"
        />
        <el-radio label="detailTime">详细时间</el-radio>
        <wj-form
          v-bind="detailTimeConfig"
          v-model="formData"
          :disable="simTimeStyle === 'detailTime' ? false : true"
        />
      </el-radio-group>
      <div class="split">模拟参数</div>
      <wj-input v-bind="otherInfoConfig" v-model="formData" />
      <div class="save_config">
        <el-button type="primary" @click="handleSaveConfig">保存配置</el-button>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import WjForm from "@/base-ui/form";
import WjInput from "@/base-ui/input";
import {
  basicInfoConfig,
  rainfallConfig,
  dynamic_rain_fileConfig,
  evaporation_fileConfig,
  evaporation_uniformConfig,
  totalTimeConfig,
  detailTimeConfig,
  otherInfoConfig,
} from "./config/simulate_build.config";
import { useStore } from "@/store";
import { ParSimulateParams } from "@/global/enum";
import { ElNotification } from "element-plus";

export default defineComponent({
  props: {
    scrollheight: {
      type: String,
      default: "500px",
    },
  },
  components: {
    WjForm,
    WjInput,
  },
  setup() {
    const store = useStore();
    const getModelItems = () => {
      basicInfoConfig.formItems[0].options = [];
      store.state.modelModule.modelList.forEach((item) => {
        basicInfoConfig.formItems[0].options?.push({
          value: item.scid,
          label: item.sceneryname,
        });
      });
    };
    if (store.state.modelModule.modelList.length === 0) {
      store
        .dispatch("modelModule/loadModelListAction", {
          pageUrl: "/model/queryAll",
        })
        .then((res) => {
          getModelItems();
        });
    } else {
      getModelItems();
    }
    const formOriginData: any = {};
    for (const item in ParSimulateParams) {
      formOriginData[item] = "";
    }
    const formData = ref(formOriginData);
    const rainfallStyle = ref("rainfall");
    const evaporateStyle = ref("file");
    const simTimeStyle = ref("totalTime");
    const handleSaveConfig = () => {
      const parList = new FormData();
      const now_timestamp = Math.round(new Date().getTime() / 1000);
      // 时间戳作为simulateID
      parList.append("simulateID", now_timestamp.toString());
      for (const item in formData.value) {
        if (formData.value[item] instanceof Date) {
          parList.append(item, formData.value[item]);
        } else if (typeof formData.value[item] === "object") {
          parList.append(formData.value[item].name, formData.value[item].file);
        } else if (typeof formData.value[item] === "string") {
          parList.append(item, formData.value[item]);
        }
      }
      store
        .dispatch("modelModule/simulateConfigAction", {
          pageUrl: "/simulate/simulate_build",
          simulateData: parList,
        })
        .then((res) => {
          ElNotification({
            title: "Success",
            message: `情景构建完成...`,
            type: "success",
            position: "bottom-right",
          });
        });
    };
    return {
      basicInfoConfig,
      rainfallConfig,
      dynamic_rain_fileConfig,
      evaporation_fileConfig,
      evaporation_uniformConfig,
      totalTimeConfig,
      detailTimeConfig,
      otherInfoConfig,
      formData,
      rainfallStyle,
      evaporateStyle,
      simTimeStyle,
      handleSaveConfig,
    };
  },
});
</script>

<style scoped lang="less">
.simulate_build {
  background-color: #fff;
  padding: 20px;
  .wj-form {
    padding-top: 18px;
  }
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
  }
  .split-add {
    margin: 15px 0 5px;
  }
  .el-radio-group {
    display: block;
    .el-radio {
      display: flex;
      justify-content: left;
    }
  }
  .save_config {
    display: flex;
    justify-content: flex-end;
    margin: 10px 0;
    .el-button {
      width: 150px;
    }
  }
}
</style>
