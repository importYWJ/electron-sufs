<template>
  <div>
    <div class="formContent">
      <wj-form v-bind="basedModelConfig" v-model="modelInfo" />
    </div>
    <div class="tableContent">
      <wj-table
        v-bind="simulateTableConfig"
        :tableData="simulateTableData"
        :dataCount="simulateDataCount"
        v-model:page="pageInfo"
        @selectionChange="selectFoo1"
      >
        <template #createDate="scope">
          {{ $filters.formatTimestamp(scope.row.sid) }}
        </template>
        <template #handler="scope">
          <div class="handle-btns">
            <el-button
              size="small"
              type="text"
              :icon="Edit"
              @click="handleEditClick(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              type="text"
              style="color: red"
              :icon="Delete"
              @click="handleDeleteClick(scope.row)"
            >
              删除
            </el-button>
          </div>
        </template>
      </wj-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import WjForm from "@/base-ui/form";
import WjTable from "@/base-ui/table";
import {
  basedModelConfig,
  simulateTableConfig,
} from "./config/simulate_manage.config";
import { useStore } from "@/store";
import { Edit, Delete } from "@element-plus/icons-vue";

export default defineComponent({
  components: {
    WjForm,
    WjTable,
  },
  setup() {
    const store = useStore();
    const getModelItems = () => {
      basedModelConfig.formItems[0].options = [];
      store.state.modelModule.modelList.forEach((item) => {
        basedModelConfig.formItems[0].options?.push({
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
    const modelInfo = ref({ modelID: "" });

    const pageInfo = ref({
      currentPage: 0,
      pageSize: 10,
    });
    watch([modelInfo, pageInfo], () => getPageData());
    const getPageData = (queryInfo: any = {}) => {
      store.dispatch("modelModule/loadSimulateListAction", {
        pageUrl: "/simulate/queryAll",
        queryInfo: {
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize, // 偏移(可用于分页)
          size: pageInfo.value.pageSize, // 一次展示数量},
          modelID: modelInfo.value.modelID,
          ...queryInfo,
        },
      });
    };
    getPageData();

    const simulateTableData = computed(
      () => store.state.modelModule.simulateList
    );
    const simulateDataCount = computed(
      () => store.state.modelModule.simulateCount
    );

    const handleEditClick = (item: any) => {
      console.log("编辑:", item);
      store.dispatch("modelModule/modelQueryAction", {
        pageUrl: "/simulate/query",
        modelID: item.sid,
      });
    };

    const handleDeleteClick = (item: any) => {
      console.log("删除:", item.scid);
      store.dispatch("modelModule/modelDeleteAction", {
        pageUrl: "/simulate/delete",
        modelID: item.sid,
      });
    };
    return {
      basedModelConfig,
      simulateTableConfig,
      simulateTableData,
      modelInfo,
      pageInfo,
      simulateDataCount,
      handleEditClick,
      handleDeleteClick,
      Edit,
      Delete,
    };
  },
});
</script>

<style scoped lang="less">
.wj-form {
  .el-form-item {
    margin: 0;
  }
}
.tableContent {
  background-color: #fff;
  padding: 20px;
  border-top: 20px solid #f5f5f9;
}
</style>
