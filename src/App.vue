<template>
  <div class="app">
    <!-- <h2>{{ $store.state.name }}</h2> -->
    <!-- <router-link to="/login"></router-link> -->
    <router-link to="/main">首页</router-link>
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>

    <!-- <el-button>哈哈哈</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="danger">警告按钮</el-button> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

export default defineComponent({
  name: "App",

  components: {
    ElConfigProvider,
  },
  setup() {
    return {
      zhCn,
    };
  },
});
</script>

<style>
.app {
  height: 100%;
}
</style>
