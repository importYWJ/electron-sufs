<template>
  <div class="model-manage">
    <!-- <div class="formContent">
      <wj-form v-bind="formConfig" v-model="formData">
        <template #header>
          <h1>模型构建</h1>
        </template>
        <template #footer>
          <el-button @click="handleResetClick">重置</el-button>
          <el-button type="primary">建立模型</el-button>
        </template>
      </wj-form>
    </div> -->
    <div class="tableContent">
      <wj-table
        v-bind="tableConfig"
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
import { formConfig, tableConfig } from "./config/pipe_manage.config";
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
      store.dispatch("modelModule/loadModelListAction", {
        pageUrl: "/model/queryAll",
        queryInfo: {
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize, // 偏移(可用于分页)
          size: pageInfo.value.pageSize, // 一次展示数量
          ...queryInfo,
        },
      });
    };
    getPageData();
    const formItems = formConfig?.formItems ?? [];
    const formOriginData: any = {};
    for (const item of formItems) {
      formOriginData[item.field] = "";
    }
    const formData = ref(formOriginData);
    const tableData = computed(() => store.state.modelModule.modelList);
    const dataCount = computed(() => store.state.modelModule.modelCount);

    const handleResetClick = () => {
      formData.value = formOriginData;
    };
    const handleSearchClick = () => {
      console.log("查询按钮点击事件~");
    };

    const handleDeleteClick = (item: any) => {
      console.log(`删除${item[0]}`);
    };

    const selectFoo = (value: any) => {
      console.log("选择切换: ", value);
    };
    return {
      formConfig,
      tableConfig,
      formData, // 双向
      tableData, // 单向
      dataCount,
      pageInfo,
      Edit,
      Delete,
      handleResetClick,
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
