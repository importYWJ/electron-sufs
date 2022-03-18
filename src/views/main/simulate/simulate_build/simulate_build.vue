<template>
  <div class="simulate_build">
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
      <el-radio label="dynamic_rain_file"
        >网络通用数据格式文件(.nctCDF)</el-radio
      >
      <wj-input
        v-bind="dynamic_rain_fileConfig"
        v-model="formData"
        :disable="rainfallStyle === 'dynamic_rain_file' ? false : true"
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
      <el-button type="primary">保存配置</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from "vue";
import WjForm from "@/base-ui/form";
import WjInput from "@/base-ui/input";
import {
  basicInfoConfig,
  rainfallConfig,
  dynamic_rain_fileConfig,
  totalTimeConfig,
  detailTimeConfig,
  otherInfoConfig,
} from "./config/simulate_build.config";
import { useStore } from "@/store";

export default defineComponent({
  components: {
    WjForm,
    WjInput,
  },
  setup() {
    const store = useStore();
    if (store.state.modelModule.modelList.length === 0) {
      store.dispatch("modelModule/loadModelListAction", {
        pageUrl: "/model/model_manage", // 后端路由和前端路由一致
      });
    }
    const getModelItems = () => {
      basicInfoConfig.formItems[0].options = [];
      store.state.modelModule.modelList.forEach((item) => {
        basicInfoConfig.formItems[0].options?.push({
          value: item.scid,
          title: item.sceneryname,
        });
      });
    };
    getModelItems();
    onBeforeMount(getModelItems);

    const formItems = basicInfoConfig?.formItems ?? [];
    const formOriginData: any = {};
    for (const item of formItems) {
      formOriginData[item.field] = "";
    }
    const formData = ref(formOriginData);
    const rainfallStyle = ref("rainfall");
    const simTimeStyle = ref("totalTime");
    return {
      basicInfoConfig,
      rainfallConfig,
      dynamic_rain_fileConfig,
      totalTimeConfig,
      detailTimeConfig,
      otherInfoConfig,
      formData,
      rainfallStyle,
      simTimeStyle,
    };
  },
});
</script>

<style scoped lang="less">
.simulate_build {
  background-color: #fff;
  // height: 100%;
  padding: 20px;
  .wj-form {
    padding-top: 18px;
    // width: 100%;
    // display: flex;
    // justify-content: stretch;
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
