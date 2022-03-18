<template>
  <div class="pipe_build">
    <el-tabs type="border-card">
      <el-tab-pane label="管线建模">
        <div class="split">原始管线Shp数据</div>
        <wj-input v-bind="pipeLineFileConfig" v-model="formData" />
        <div class="split">字段匹配</div>
        <wj-table v-bind="pipelineTableConfig">
          <template #header><div class="table-top"></div></template>
        </wj-table>
      </el-tab-pane>
      <el-tab-pane label="管点建模">
        <div class="split">原始管点Shp数据</div>
        <wj-input v-bind="pipePointFileConfig" v-model="formData" />
        <div class="split">字段匹配</div>
        <wj-table v-bind="pipePointTableConfig">
          <template #header><div class="table-top"></div></template>
        </wj-table>
      </el-tab-pane>
      <el-tab-pane label="排水口建模">
        <div class="split">原始排水口Shp数据</div>
        <wj-input v-bind="pipeOutfallFileConfig" v-model="formData" />
        <div class="split">字段匹配</div>
        <wj-table v-bind="pipeOutfallTableConfig">
          <template #header><div class="table-top"></div></template>
        </wj-table>
      </el-tab-pane>
      <el-tab-pane label="管网参数配置">
        <div class="split">管网下渗模型</div>
        <wj-form v-bind="pipeInfiltrationConfig" v-model="formData" />
        <div class="split">管网水流方式</div>
        <wj-form v-bind="pipeFlowTypeConfig" v-model="formData" />
        <div class="split">管道最小坡度</div>
        <wj-input v-bind="pipeMinSlopeConfig" v-model="formData" />
        <div class="split">管网模拟步长调控系数</div>
        <wj-input v-bind="pipeStepRegulationConfig" v-model="formData" />
      </el-tab-pane>
    </el-tabs>
    <div class="split split-add">管网模型名称</div>
    <wj-input v-bind="pipeModelBtnConfig" v-model="formData" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  pipeLineFileConfig,
  pipelineTableConfig,
  pipePointFileConfig,
  pipePointTableConfig,
  pipeOutfallFileConfig,
  pipeOutfallTableConfig,
  pipeInfiltrationConfig,
  pipeFlowTypeConfig,
  pipeMinSlopeConfig,
  pipeStepRegulationConfig,
  pipeModelBtnConfig,
} from "./config/pipe_build.config";
import WjInput from "@/base-ui/input";
import WjTable from "@/base-ui/table";
import WjForm from "@/base-ui/form";

export default defineComponent({
  components: {
    WjInput,
    WjTable,
    WjForm,
  },
  setup() {
    const formItems = pipeLineFileConfig?.inputItems ?? [];
    const formOriginData: any = {};
    for (const item of formItems) {
      formOriginData[item.field] = "";
    }
    const formData = ref(formOriginData);
    return {
      pipeLineFileConfig,
      pipelineTableConfig,
      pipePointFileConfig,
      pipePointTableConfig,
      pipeOutfallFileConfig,
      pipeOutfallTableConfig,
      pipeInfiltrationConfig,
      pipeFlowTypeConfig,
      pipeMinSlopeConfig,
      pipeStepRegulationConfig,
      pipeModelBtnConfig,
      formData,
    };
  },
});
</script>

<style scoped lang="less">
.pipe_build {
  background-color: #fff;
  padding: 20px;
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
  .wj-table {
    .table-top {
      height: 18px;
    }
  }
}
</style>
