<template>
  <div class="model-manage">
    <div class="tableContent">
      <wj-table
        v-bind="tableConfig"
        :tableData="tableData"
        :dataCount="dataCount"
        v-model:page="pageInfo"
        @selectionChange="selectFoo"
      >
        <template #createDate="scope">
          {{ $filters.formatTimestamp(scope.row.inpid) }}
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
              删除
            </el-button>
          </div>
        </template>
        <template #headerHandler>
          <el-button type="primary" @click="handleSearchClick">查询</el-button>
        </template>
      </wj-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import WjTable from "@/base-ui/table";
import { Edit, Delete } from "@element-plus/icons-vue";
import { tableConfig } from "./config/pipe_manage.config";
import { useStore } from "@/store";

export default defineComponent({
  components: {
    WjTable,
  },
  setup() {
    const store = useStore();
    const pageInfo = ref({ currentPage: 0, pageSize: 10 });
    watch(pageInfo, () => getPageData());

    const getPageData = (queryInfo: any = {}) => {
      store.dispatch("pipeModule/loadModelListAction", {
        pageUrl: "/pipe/queryAll",
        queryInfo: {
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize, // 偏移(可用于分页)
          size: pageInfo.value.pageSize, // 一次展示数量
          ...queryInfo,
        },
      });
    };
    getPageData();
    const tableData = computed(() => store.state.pipeModule.pipeModelList);
    const dataCount = computed(() => store.state.pipeModule.pipeModelCount);

    const handleSearchClick = () => {
      console.log("查询按钮点击事件~");
    };

    const handleDeleteClick = (item: any) => {
      store.dispatch("modelModule/modelDeleteAction", {
        pageUrl: "/pipe/delete",
        modelID: item.inpid,
      });
    };

    const selectFoo = (value: any) => {
      console.log("选择切换: ", value);
    };

    return {
      tableConfig,
      tableData, // 单向
      dataCount,
      pageInfo,
      Edit,
      Delete,
      handleSearchClick,
      handleDeleteClick,
      selectFoo,
    };
  },
});
</script>

<style scoped>
.model-manage {
  background-color: #fff;
}
.formContent {
  padding-bottom: 20px;
}

.tableContent {
  padding: 20px;
  border-top: 20px solid #f5f5f9;
}
</style>
