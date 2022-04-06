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
        <el-scrollbar height="329px">
          <wj-table v-bind="pipelineTableConfig" :tableData="ConduitTable">
            <template #shpfield="scope">
              <el-select v-model="formData.ConduitMatch[scope.row.origin]">
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
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="管点建模">
        <div class="split">原始管点Shp数据</div>
        <wj-input
          v-bind="pipePointFileConfig"
          v-model="formData"
          :multiple="true"
        />
        <div class="split">字段匹配</div>
        <el-scrollbar height="329px">
          <wj-table v-bind="pipePointTableConfig" :tableData="JunctionTable">
            <template #shpfield="scope">
              <el-select v-model="formData.JunctionMatch[scope.row.origin]">
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
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="排水口建模">
        <div class="split">原始排水口Shp数据</div>
        <wj-input
          v-bind="pipeOutfallFileConfig"
          v-model="formData"
          :multiple="true"
        />
        <div class="split">字段匹配</div>
        <el-scrollbar height="329px">
          <wj-table v-bind="pipeOutfallTableConfig" :tableData="OutfallTable">
            <template #shpfield="scope">
              <el-select v-model="formData.OutfallMatch[scope.row.origin]">
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
        </el-scrollbar>
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
        <div class="split">管线模拟单位</div>
        <wj-form v-bind="pipeSimulateUnitConfig" v-model="formData" />
      </el-tab-pane>
    </el-tabs>
    <div class="split split-add">管网模型名称</div>
    <div class="build">
      <wj-input v-bind="pipeModelNameConfig" v-model="formData" />
      <el-button type="primary" @click="handleBuildInp">建立模型</el-button>
    </div>
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
  pipeSimulateUnitConfig,
  pipeModelNameConfig,
} from "./config/pipe_build.config";
import WjInput from "@/base-ui/input";
import WjTable from "@/base-ui/table";
import WjForm from "@/base-ui/form";
import { InpConduit, InpJunction, InpOutfall } from "@/global";
import { useStore } from "@/store";
import { InpBuildParams } from "@/global/enum";

export default defineComponent({
  components: {
    WjInput,
    WjTable,
    WjForm,
  },
  setup() {
    const store = useStore();
    // 双向绑定界面表单
    const formOriginData: any = {};
    for (const item in InpBuildParams) {
      if (item.endsWith("Match")) {
        formOriginData[item] = {};
      } else {
        formOriginData[item] = "";
      }
    }
    const formData = ref(formOriginData);
    // 动态添加tableData、定义临时的el-select绑定值
    const ConduitTable: any[] = reactive([]);
    for (const field in InpConduit) {
      ConduitTable.push({ origin: field, match: "" });
      formData.value.ConduitMatch[field] = "";
    }
    const JunctionTable: any[] = reactive([]);
    for (const field in InpJunction) {
      JunctionTable.push({ origin: field, match: "" });
      formData.value.JunctionMatch[field] = "";
    }
    const OutfallTable: any[] = reactive([]);
    for (const field in InpOutfall) {
      OutfallTable.push({ origin: field, match: "" });
      formData.value.OutfallMatch[field] = "";
    }

    // 通过监听文件路径变化, 发送ID和文件
    const conduitPath = computed(() => formData.value?.pipelinefile?.path);
    const junctionPath = computed(() => formData.value?.pipepointfile?.path);
    const outfallPath = computed(() => formData.value?.pipeoutfallfile?.path);
    // 保存请求到的shp字段
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
      // 监听shp文件路径名称的改变执行post文件操作
      formData.value.ConduitID = Math.round(new Date().getTime() / 1000);
      const shpData = new FormData();
      shpData.append("pipeID", formData.value.ConduitID.toString());
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
      formData.value.JunctionID = Math.round(new Date().getTime() / 1000);
      const shpData = new FormData();
      shpData.append("pipeID", formData.value.JunctionID.toString());
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
      formData.value.OutfallID = Math.round(new Date().getTime() / 1000);
      const shpData = new FormData();
      shpData.append("pipeID", formData.value.OutfallID.toString());
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
    // 最终模型构建
    const handleBuildInp = () => {
      const inpList = new FormData();
      const now_timestamp = Math.round(new Date().getTime() / 1000);
      // 时间戳作为ID
      inpList.append("inpID", now_timestamp.toString());
      for (const item in formData.value) {
        if (typeof formData.value[item] === "object") {
          if (formData.value[item].file !== undefined) {
            continue;
          } else {
            inpList.append(item, JSON.stringify(formData.value[item]));
          }
        } else {
          inpList.append(item, formData.value[item]);
        }
      }
      store.dispatch("pipeModule/pipeConfigAction", {
        pageUrl: "/pipe/pipe_build",
        modelData: inpList,
      });
    };
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
      pipeSimulateUnitConfig,
      pipeModelNameConfig,
      formData,
      ConduitTable,
      JunctionTable,
      OutfallTable,
      conduitFields,
      junctionFields,
      outfallFields,
      handleBuildInp,
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
  .build {
    display: flex;
    .el-form {
      width: 100%;
    }
    .el-button {
      width: 150px;
      margin-top: 10px;
    }
  }
}
</style>
