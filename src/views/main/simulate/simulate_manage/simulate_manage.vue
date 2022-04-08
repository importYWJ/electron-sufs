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
              :icon="VideoPlay"
              type="success"
              round
              @click="handleShowClick(scope.row)"
            >
              查看
            </el-button>
            <el-button
              size="small"
              :icon="VideoPlay"
              type="primary"
              round
              @click="handleRunClick(scope.row)"
            >
              运行
            </el-button>
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
  <el-dialog v-model="dialogVisible" title="情景修改" width="30%" draggable>
    <simulate-build scrollheight="300px"></simulate-build>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import WjForm from "@/base-ui/form";
import WjTable from "@/base-ui/table";
import SimulateBuild from "@/components/simulate-build";
import {
  basedModelConfig,
  simulateTableConfig,
} from "./config/simulate_manage.config";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
import { Edit, Delete, VideoPlay } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";

export default defineComponent({
  components: {
    WjForm,
    WjTable,
    SimulateBuild,
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
    const modelProgress = computed(() => store.state.modelModule.modelProgress);
    const dialogVisible = ref(false);
    const router = useRouter();
    const showMap = () => {
      router.push({
        path: "/main/simulate/simulate_run",
      });
    };
    const handleShowClick = (item: any) => {
      store
        .dispatch("modelModule/modelRunShowAction", {
          pageUrl: "/simulate/show",
          modelID: modelInfo.value.modelID,
          simulateID: item.sid,
        })
        .then((res) => {
          if (res?.status === "1") {
            // 1: 有情景数据, 切换到地图页面展示
            showMap();
          } else {
            // 0: 无情景数据, 报错无法展示
            ElNotification({
              title: "Error",
              message: `当前情景未运行...`,
              type: "error",
              position: "bottom-right",
            });
          }
        });
    };
    const handleRunClick = (item: any) => {
      store
        .dispatch("modelModule/modelRunShowAction", {
          pageUrl: "/simulate/run",
          modelID: modelInfo.value.modelID,
          simulateID: item.sid,
        })
        .then((res) => {
          if (res?.status === "1") {
            // 1: 有情景数据, 报错无法运行
            ElNotification({
              title: "Error",
              message: `当前情景已运行完毕...`,
              type: "error",
              position: "bottom-right",
            });
          } else {
            ElNotification({
              // 0: 无情景数据, 开始运行
              title: "Success",
              message: `开始运行情景...`,
              type: "success",
              position: "bottom-right",
            });
            const interval = setInterval(() => {
              if (modelProgress.value < 100) {
                store.dispatch("modelModule/modelRunProgressAction", {
                  pageUrl: "/simulate/GetProcess",
                });
              } else {
                clearInterval(interval);
                ElNotification({
                  title: "Success",
                  message: `情景运行完成...`,
                  type: "success",
                  position: "bottom-right",
                });
              }
            }, 2000);
          }
        });
    };
    const handleEditClick = (item: any) => {
      // 1. 根据item请求OriginData格式的数据
      // store.dispatch("modelModule/modelQueryAction", {
      //   pageUrl: "/simulate/query",
      //   modelID: item.sid,
      // });
      // 2. 请求值填充(文件项需要路径)
      // 3. 设置dialogVisible为true
      dialogVisible.value = true;
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
      dialogVisible,
      handleShowClick,
      handleRunClick,
      handleEditClick,
      handleDeleteClick,
      Edit,
      Delete,
      VideoPlay,
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
  margin-top: 10px;
}
</style>
