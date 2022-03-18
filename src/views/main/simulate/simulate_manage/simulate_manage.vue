<template>
  <div class="wj-form">
    <div class="tableContent">
      <wj-table
        v-bind="modelTableConfig"
        :tableData="tableData"
        :dataCount="dataCount"
        v-model:page="pageInfo"
        @selectionChange="selectFoo"
      >
        <template #createDate="scope">
          {{ $filters.formatTimestamp(scope.row.scid) }}
        </template>
        <template #handler="scope">
          <div class="handle-btns">
            <el-button size="small" type="text" :icon="Edit"> 编辑 </el-button>
            <el-button
              size="small"
              type="text"
              style="color: red"
              :icon="Delete"
              @click="handleDeleteClick(scope.row)"
            >
              删除</el-button
            >
          </div>
        </template>
      </wj-table>
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
            <el-button size="small" type="text" :icon="Edit"> 编辑 </el-button>
            <el-button
              size="small"
              type="text"
              style="color: red"
              :icon="Delete"
              @click="handleDeleteClick(scope.row)"
            >
              删除</el-button
            >
          </div>
        </template>
      </wj-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import WjTable from "@/base-ui/table";
import {
  modelTableConfig,
  simulateTableConfig,
} from "./config/simulate_manage.config";
import { useStore } from "@/store";
import { Edit, Delete } from "@element-plus/icons-vue";

export default defineComponent({
  components: {
    WjTable,
  },
  setup() {
    const store = useStore();
    const pageInfo = ref({
      currentPage: 0,
      pageSize: 10,
      modelID: "1646189996",
    });
    watch(pageInfo, () => getPageData());
    const getPageData = (queryInfo: any = {}) => {
      console.log(typeof pageInfo.value.modelID);
      store.dispatch("modelModule/loadSimulateListAction", {
        pageUrl: "/simulate/simulate_manage",
        // pageUrl: "/model/model_manage",
        queryInfo: {
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize, // 偏移(可用于分页)
          size: pageInfo.value.pageSize, // 一次展示数量},
          modelID: pageInfo.value.modelID,
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
    return {
      modelTableConfig,
      simulateTableConfig,
      simulateTableData,
      pageInfo,
      simulateDataCount,
      Edit,
      Delete,
    };
  },
});
</script>

<style scoped lang="less">
.wj-form {
  height: 100%;
  width: 100%;
  .tableContent {
    background-color: #fff;
    padding: 20px;
    border-top: 20px solid #f5f5f9;
  }
}
</style>
