<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '200px'">
        <nav-menu :collapse="isCollapse"></nav-menu>
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-header @foldChange="handleFoldChange"></nav-header>
        </el-header>
        <el-main class="page-content">
          <div class="page-router">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import NavMenu from "@/components/nav-menu";
import NavHeader from "@/components/nav-header";

export default defineComponent({
  components: { NavMenu, NavHeader },
  setup() {
    const isCollapse = ref(false);
    function handleFoldChange(isFold: boolean): void {
      isCollapse.value = isFold;
    }
    return { handleFoldChange, isCollapse };
  },
});
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f5f9;

  .main-content,
  .page {
    height: 100%;
  }

  .page-header {
    height: 48px;
  }

  .page-content {
    height: calc(100% - 48px);
    text-align: center;
    // background-color: #ffffff;
    .page-router {
      background-color: #f5f5f9;
      height: 100%;
    }
  }

  .el-aside {
    // overflow-x: hidden;
    // overflow-y: auto;
    // line-height: 200px;
    // text-align: left;
    // cursor: pointer;
    // background-color: #001529;
    transition: width 0.3s linear;
    // scrollbar-width: none; /* firefox */
    // -ms-overflow-style: none; /* IE 10+ */
    // &::-webkit-scrollbar {
    //   display: none;
    // }
    // background-color: #ffffff;
  }
}
</style>
