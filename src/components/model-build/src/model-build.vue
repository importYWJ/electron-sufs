<template>
  <div class="model_build">
    <el-tabs type="border-card">
      <el-tab-pane label="基础设置">
        <div class="split">模型名称</div>
        <wj-form v-bind="basicInfoConfig" v-model="formData" />
        <div class="split">模拟方式</div>
        <wj-form v-bind="modelTypeConfig" v-model="formData" />
      </el-tab-pane>
      <el-tab-pane label="参数配置">
        <!-- DEM -->
        <div class="split">导入DEM文件</div>
        <wj-input v-bind="DEMfileConfig" v-model="formData" />
        <!-- 河网数据 -->
        <div class="split">地表河网数据配置</div>
        <wj-input v-bind="riverfileConfig" v-model="formData" />
        <!-- 下渗速率 -->
        <div class="split split-add">下渗速率</div>
        <el-radio-group v-model="infiltrateStyle">
          <el-radio label="file">下渗速率文件</el-radio>
          <wj-input
            v-bind="infiltration_fileConfig"
            v-model="formData"
            :disable="infiltrateStyle === 'file' ? false : true"
          />
          <el-radio label="uniform">通用下渗速率</el-radio>
          <wj-input
            v-bind="infiltration_uniformConfig"
            v-model="formData"
            :disable="infiltrateStyle === 'uniform' ? false : true"
          />
        </el-radio-group>
        <!-- 蒸发速率 -->
        <div class="split add">蒸发速率</div>
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
        <!-- 地面监测点 -->
        <div class="split add">地面监测点</div>
        <wj-input v-bind="monitorConfig" v-model="formData" />
        <!-- 选择管网模型 -->
        <div class="split add">SUFS管网模型</div>
        <wj-form v-bind="pipeModelConfig" v-model="formData" />
      </el-tab-pane>
    </el-tabs>
    <div class="build">
      <el-button type="primary" @click="handleBuildModel">建立模型</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";
import {
  basicInfoConfig,
  modelTypeConfig,
  DEMfileConfig,
  riverfileConfig,
  infiltration_fileConfig,
  infiltration_uniformConfig,
  evaporation_fileConfig,
  evaporation_uniformConfig,
  monitorConfig,
  pipeModelConfig,
} from "./config/model_build.config";
import WjForm from "@/base-ui/form";
import WjInput from "@/base-ui/input";
import { ParModelParams } from "@/global/enum";

export default defineComponent({
  components: { WjForm, WjInput },
  setup() {
    const formOriginData: any = {};
    for (const item in ParModelParams) {
      formOriginData[item] = "";
    }
    const formData = ref(formOriginData);
    // radio设置
    const infiltrateStyle = ref("file");
    const evaporateStyle = ref("file");

    const store = useStore();
    const handleBuildModel = () => {
      const parList = new FormData();
      const now_timestamp = Math.round(new Date().getTime() / 1000);
      // 时间戳作为modelID
      parList.append("modelID", now_timestamp.toString());
      for (const item in formData.value) {
        if (typeof formData.value[item] === "object") {
          parList.append(formData.value[item].name, formData.value[item].file);
        } else if (typeof formData.value[item] === "string") {
          parList.append(item, formData.value[item]);
        }
      }
      store.dispatch("modelModule/modelConfigAction", {
        pageUrl: "/model/model_build",
        modelData: parList,
      });
    };
    return {
      basicInfoConfig,
      modelTypeConfig,
      DEMfileConfig,
      riverfileConfig,
      infiltration_fileConfig,
      infiltration_uniformConfig,
      evaporation_fileConfig,
      evaporation_uniformConfig,
      monitorConfig,
      pipeModelConfig,
      formData,
      infiltrateStyle,
      evaporateStyle,
      handleBuildModel,
    };
  },
});
</script>

<style scoped lang="less">
.split {
  height: 35px;
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

.formContent {
  padding-bottom: 20px;
}
.wj-form {
  padding-top: 5px;
  .el-form-item {
    margin: 0;
  }
}

.el-radio-group {
  justify-content: space-between;
}
.modeltype {
  display: flex;
  justify-content: flex-start;
}

.el-radio-group {
  width: 100%;
  display: block;
  .el-radio {
    display: flex;
    justify-content: left;
  }
}

.build {
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
  .el-button {
    width: 150px;
  }
}
</style>
