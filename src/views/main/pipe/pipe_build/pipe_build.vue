<template>
  <div class="pipe_build">
    <el-tabs type="border-card">
      <el-tab-pane label="管线建模">
        <div class="split">原始管线Shp数据</div>
        <wj-input
          v-bind="pipeLineFileConfig"
          v-model="formData"
          :multiple="true"
        />
        <div class="split">字段匹配</div>
        <wj-table v-bind="pipelineTableConfig" :tableData="ConduitTable">
          <template #shpfield="scope">
            <el-select v-model="scope.row.match">
              <el-option
                v-for="item in conduitFields"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </template>
          <template #header><div class="table-top"></div></template>
        </wj-table>
      </el-tab-pane>
      <el-tab-pane label="管点建模">
        <div class="split">原始管点Shp数据</div>
        <wj-input
          v-bind="pipePointFileConfig"
          v-model="formData"
          :multiple="true"
        />
        <div class="split">字段匹配</div>
        <wj-table v-bind="pipePointTableConfig" :tableData="JunctionTable">
          <template #shpfield="scope">
            <el-select v-model="scope.row.match">
              <el-option
                v-for="item in junctionFields"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </template>
          <template #header><div class="table-top"></div></template>
        </wj-table>
      </el-tab-pane>
      <el-tab-pane label="排水口建模">
        <div class="split">原始排水口Shp数据</div>
        <wj-input
          v-bind="pipeOutfallFileConfig"
          v-model="formData"
          :multiple="true"
        />
        <div class="split">字段匹配</div>
        <wj-table v-bind="pipeOutfallTableConfig" :tableData="OutfallTable">
          <template #shpfield="scope">
            <el-select v-model="scope.row.match">
              <el-option
                v-for="item in outfallFields"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </template>
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
import { defineComponent, ref, reactive, watch, computed } from "vue";
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
import { InpConduit, InpJunction, InpOutfall } from "@/global";
import { useStore } from "@/store";

export default defineComponent({
  components: {
    WjInput,
    WjTable,
    WjForm,
  },
  setup() {
    const store = useStore();
    // 动态添加tableData(问题:table的data格式不好作为el-select的v-model)
    const ConduitTable: any[] = reactive([]);
    for (const field in InpConduit) {
      ConduitTable.push({ origin: field, match: "" });
    }
    const JunctionTable: any[] = reactive([]);
    for (const field in InpJunction) {
      JunctionTable.push({ origin: field, match: "" });
    }
    const OutfallTable: any[] = reactive([]);
    for (const field in InpOutfall) {
      OutfallTable.push({ origin: field, match: "" });
    }
    // 双向绑定界面表单
    const formItems = pipeLineFileConfig?.inputItems ?? [];
    const formOriginData: any = {};
    for (const item of formItems) {
      formOriginData[item.field] = "";
    }
    const formData = ref(formOriginData);
    // 通过监听文件路径变化, 发送ID和文件
    const conduitPath = computed(() => formData.value?.pipelinefile?.path);
    const junctionPath = computed(() => formData.value?.pipepointfile?.path);
    const outfallPath = computed(() => formData.value?.pipeoutfallfile?.path);
    const conduitID = ref(0);
    const junctionID = ref(0);
    const outfallID = ref(0);
    const conduitFields = computed(
      () => store.state.pipeModule.conduitFieldsList
    );
    const junctionFields = computed(
      () => store.state.pipeModule.junctionFieldsList
    );
    const outfallFields = computed(
      () => store.state.pipeModule.outfallFieldsList
    );

    watch(conduitPath, () => {
      // 文件改变则立即发送给后台
      conduitID.value = Math.round(new Date().getTime() / 1000);
      const shpData = new FormData();
      shpData.append("pipeID", conduitID.value.toString());
      shpData.append("pipeType", "conduit");
      formData.value?.pipelinefile?.file.forEach((item: File) => {
        console.log(item);
        shpData.append(item.name.split(".")[1], item);
      });
      store.dispatch("pipeModule/loadPipeFieldsAction", {
        pageUrl: "pipe/fields",
        shpData: shpData,
        pipeType: "Conduit",
      });
    });
    watch(junctionPath, () => {
      junctionID.value = Math.round(new Date().getTime() / 1000);
      const shpData = new FormData();
      shpData.append("pipeID", junctionID.value.toString());
      shpData.append("pipeType", "junction");
      formData.value?.pipepointfile?.file.forEach((item: File) => {
        shpData.append(item.name.split(".")[1], item);
      });
      store.dispatch("pipeModule/loadPipeFieldsAction", {
        pageUrl: "pipe/fields",
        shpData: shpData,
        pipeType: "Junction",
      });
    });
    watch(outfallPath, () => {
      outfallID.value = Math.round(new Date().getTime() / 1000);
      const shpData = new FormData();
      shpData.append("pipeID", outfallID.value.toString());
      shpData.append("pipeType", "outfall");
      formData.value?.pipeoutfallfile?.file.forEach((item: File) => {
        shpData.append(item.name.split(".")[1], item);
      });
      store.dispatch("pipeModule/loadPipeFieldsAction", {
        pageUrl: "pipe/fields",
        shpData: shpData,
        pipeType: "Outfall",
      });
    });
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
      ConduitTable,
      JunctionTable,
      OutfallTable,
      conduitFields,
      junctionFields,
      outfallFields,
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
