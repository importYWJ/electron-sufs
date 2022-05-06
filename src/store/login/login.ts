import router from "@/router";
import { Module } from "vuex";
import { IRootState } from "../types";
import { ILoginState } from "./types";
import { mapMenusToRoutes } from "../../utils/map-menus";

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userMenus: [
        {
          id: 0,
          name: "管网建模",
          type: 1,
          url: "/main/pipe",
          icon: "el-icon-monitor",
          children: [
            {
              id: 1,
              name: "管网建模",
              type: 2,
              url: "/main/pipe/pipe_build",
              icon: "el-icon-monitor",
              children: null,
            },
            {
              id: 2,
              name: "模型管理",
              type: 2,
              url: "/main/pipe/pipe_manage",
              icon: "el-icon-monitor",
              children: null,
            },
          ],
        },
        {
          id: 10,
          name: "雷达建模",
          type: 1,
          url: "/main/radar",
          icon: "el-icon-monitor",
          children: [
            {
              id: 11,
              name: "雷达建模",
              type: 2,
              url: "/main/radar/radar_build",
              icon: "el-icon-monitor",
              children: null,
            },
            {
              id: 12,
              name: "模型管理",
              type: 2,
              url: "/main/radar/radar_manage",
              icon: "el-icon-monitor",
              children: null,
            },
          ],
        },
        {
          id: 3,
          name: "时空建模",
          type: 1,
          url: "/main/model",
          icon: "el-icon-monitor",
          children: [
            {
              id: 4,
              name: "模型构建",
              type: 2,
              url: "/main/model/model_build",
              icon: "el-icon-monitor",
              children: null,
            },
            {
              id: 5,
              name: "模型管理",
              type: 2,
              url: "/main/model/model_manage",
              icon: "el-icon-monitor",
              children: null,
            },
          ],
        },
        {
          id: 6,
          name: "时空模拟",
          type: 1,
          url: "/main/simulate",
          icon: "el-icon-monitor",
          children: [
            {
              id: 7,
              name: "情景管理",
              type: 2,
              url: "/main/simulate/simulate_manage",
              icon: "el-icon-monitor",
              children: null,
            },
            {
              id: 8,
              name: "情景构建",
              type: 2,
              url: "/main/simulate/simulate_build",
              icon: "el-icon-monitor",
              children: null,
            },
            {
              id: 9,
              name: "情景运行",
              type: 2,
              url: "/main/simulate/simulate_run",
              icon: "el-icon-monitor",
              children: null,
            },
          ],
        },

        {
          id: 13,
          name: "数据驱动",
          type: 1,
          url: "/main/train",
          icon: "el-icon-monitor",
          children: [
            {
              id: 14,
              name: "参数配置",
              type: 2,
              url: "/main/train/train_build",
              icon: "el-icon-monitor",
              children: null,
            },
          ],
        },
      ],
    };
  },
  actions: {
    loadLocalLogin({ commit, state }) {
      const userMenus = state.userMenus;
      if (userMenus) {
        commit("changeUserMenus", userMenus);
      }
    },
  },
  getters: {},
  mutations: {
    changeUserMenus(state, userMenus: any) {
      // console.log(userMenus);

      // 映射到routes
      const routes = mapMenusToRoutes(userMenus);
      // console.log(routes);
      routes.forEach((route) => {
        router.addRoute("main", route);
      });
    },
  },
};

export default loginModule;
