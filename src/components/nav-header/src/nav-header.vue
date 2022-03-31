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
        <el-button :icon="Search" @click="drawer = !drawer" circle />
      </div>
    </div>
  </div>
  <el-drawer v-model="drawer" title="I am the title" :with-header="false">
    <span>运行日志</span>
    <el-progress :percentage="50" />
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { ArrowLeftBold, ArrowRightBold } from "@element-plus/icons-vue";
import WjBreadcrumb, { IBreadcrumb } from "@/base-ui/breadcrumb";
import { pathMapBreadcrumbs } from "@/utils/map-menus";
import { useStore } from "@/store";
import { useRoute } from "vue-router";
import { Search } from "@element-plus/icons-vue";

export default defineComponent({
  components: {
    ArrowLeftBold,
    ArrowRightBold,
    WjBreadcrumb,
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
    // const btnClick = () => {
    //   console.log("测试");
    // };
    const drawer = ref(false);
    return { isFold, handleFoldClick, breadcrumbs, Search, drawer };
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
