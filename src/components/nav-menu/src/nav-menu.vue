<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">SUFS</span>
    </div>
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical"
      :unique-opened="false"
      text-color="#575862"
      :collapse="collapse"
    >
      <template v-for="item in userMenus" :key="item.id">
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon><icon-menu /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleItemClick(subitem)"
              >
                <el-icon><tools /></el-icon>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
            <!-- <template v-if="subitem.type === 2"> </template> -->
          </el-sub-menu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "@/store"; // 6-35: TS 与vuex4兼容差, 一个问题是useStore的类型
import { useRouter, useRoute } from "vue-router";
import { Menu as IconMenu, Tools } from "@element-plus/icons-vue";
import { pathMapToManu } from "@/utils/map-menus";

export default defineComponent({
  components: {
    IconMenu,
    Tools,
  },
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const userMenus = computed(() => store.state.loginModule.userMenus);
    const handleItemClick = (item: any) => {
      router.push({
        path: item.url ?? "/not-found", // "/main/pipe/pipe_build"
      });
    };
    const menu = pathMapToManu(userMenus.value, route.path);
    const defaultValue = ref(menu.id + "");
    return {
      userMenus,
      defaultValue,
      handleItemClick,
    };
  },
});
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #fff;
  .logo {
    height: 28px;
    padding: 12px 10px 8px 10px;
    display: flex;
    // justify-content: flex-start;
    // align-items: center;
    .img {
      height: 100%;
      margin: 0 10px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      margin: 2px 0 0 0;
    }
  }
  el-menu {
    border-right: none;
  }

  .el-sub-menu:hover {
    background-color: #f5f5f9;
  }
  .el-menu-item:hover {
    background-color: #f5f5f9;
  }

  .el-menu-item.is-active {
    color: #fff;
    background-color: #6d83ce;
  }
}
</style>
