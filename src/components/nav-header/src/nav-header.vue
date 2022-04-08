<template>
  <div class="nav-header">
    <el-icon @click="handleFoldClick">
      <template v-if="isFold === true">
        <arrow-left-bold />
      </template>
      <template v-else>
        <arrow-right-bold />
      </template>
    </el-icon>
    <div class="content">
      <wj-breadcrumb :breadcrumbs="breadcrumbs"></wj-breadcrumb>
      <!-- <div id="title">城市洪涝时空建模与模拟系统</div> -->
      <div class="right">
        <el-tooltip content="情景管理" placement="bottom" effect="light">
          <el-button
            :icon="Search"
            @click="showSimulateManageDialog = !showSimulateManageDialog"
            circle
          />
        </el-tooltip>
        <el-tooltip content="情景构建" placement="bottom" effect="light">
          <el-button
            :icon="Grid"
            @click="showSimulateBuildDialog = !showSimulateBuildDialog"
            circle
          />
        </el-tooltip>
        <el-tooltip content="地图操作" placement="bottom" effect="light">
          <el-button :icon="Operation" @click="showLog = !showLog" circle />
        </el-tooltip>
        <el-tooltip content="显示地图" placement="bottom" effect="light">
          <el-button :icon="MapLocation" @click="showMap" circle />
        </el-tooltip>
        <el-tooltip content="系统设置" placement="bottom" effect="light">
          <el-button :icon="Setting" @click="showLog = !showLog" circle />
        </el-tooltip>
      </div>
    </div>
  </div>
  <el-dialog
    v-model="showSimulateManageDialog"
    title="情景管理"
    width="90%"
    draggable
  >
    <simulate-manage></simulate-manage>
  </el-dialog>
  <el-dialog
    v-model="showSimulateBuildDialog"
    title="情景构建"
    width="90%"
    draggable
  >
    <simulate-build></simulate-build>
  </el-dialog>
  <el-drawer v-model="showLog" title="运行日志">
    <wj-card title="情景1">
      <el-progress :percentage="50"></el-progress>
      <el-divider />
      <el-scrollbar max-height="80px" always>
        <div v-for="o in 20" :key="o" class="text item">
          {{ `[success][2022-04-08 10:10:10]: 输出${o}` }}
        </div>
      </el-scrollbar>
    </wj-card>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { ArrowLeftBold, ArrowRightBold } from "@element-plus/icons-vue";
import WjBreadcrumb from "@/base-ui/breadcrumb";
import WjCard from "@/base-ui/card";
import { pathMapBreadcrumbs } from "@/utils/map-menus";
import { useStore } from "@/store";
import { useRoute, useRouter } from "vue-router";
import SimulateManage from "@/views/main/simulate/simulate_manage/simulate_manage.vue";
import SimulateBuild from "@/components/simulate-build";
import {
  Search,
  MapLocation,
  Operation,
  Grid,
  Setting,
} from "@element-plus/icons-vue";

export default defineComponent({
  components: {
    ArrowLeftBold,
    ArrowRightBold,
    WjBreadcrumb,
    WjCard,
    SimulateManage,
    SimulateBuild,
  },
  emits: ["foldChange"],
  setup(props, { emit }) {
    const isFold = ref(false);
    const handleFoldClick = () => {
      // currentTab.value = "arrow-right-bold";
      isFold.value = !isFold.value;
      emit("foldChange", isFold.value);
    };
    const store = useStore();
    const breadcrumbs = computed(() => {
      const userMenus = store.state.loginModule.userMenus;
      const route = useRoute();
      return pathMapBreadcrumbs(userMenus, route.path);
    });
    const showLog = ref(false);
    const showSimulateBuildDialog = ref(false);
    const showSimulateManageDialog = ref(false);
    const router = useRouter();
    const showMap = () => {
      router.push({
        path: "/main/simulate/simulate_run",
      });
    };
    return {
      isFold,
      handleFoldClick,
      breadcrumbs,
      Search,
      MapLocation,
      Operation,
      Grid,
      Setting,
      showLog,
      showSimulateBuildDialog,
      showSimulateManageDialog,
      showMap,
    };
  },
});
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  height: 48px;
  align-items: center;
  justify-content: flex-start;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    flex: 1; // 表示占据剩余所有部分
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
}

#title {
  font-weight: bold;
  font-size: 20px;
}
</style>
