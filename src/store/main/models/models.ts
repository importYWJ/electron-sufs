import { Module } from "vuex";
import { IModelState, IModelItem } from "./types";
import { IRootState } from "@/store/types";
import { getTableList, postModelConfig } from "@/service/main/models/models";
import axios from "axios";

const modelModule: Module<IModelState, IRootState> = {
  namespaced: true,
  state() {
    return {
      modelList: [],
      simulateList: [],
      modelCount: 0,
      simulateCount: 0,
    };
  },
  mutations: {
    changeModelList(state, modelList: Array<IModelItem>) {
      state.modelList = modelList;
    },
    changeSimulateList(state, simulateList: Array<IModelItem>) {
      state.simulateList = simulateList;
    },
    changeModelCount(state, modelCount: number) {
      state.modelCount = modelCount;
    },
    changeSimulateCount(state, simulateCount: number) {
      state.simulateCount = simulateCount;
    },
  },
  actions: {
    // 模型列表请求
    async loadModelListAction({ commit }, payload: any) {
      const modelList = await getTableList(payload.pageUrl, payload.queryInfo);
      commit("changeModelList", modelList.data);
      commit("changeModelCount", modelList.count);
    },
    // 模拟列表请求
    async loadSimulateListAction({ commit }, payload: any) {
      const simulateList = await getTableList(
        payload.pageUrl,
        payload.queryInfo
      );
      commit("changeSimulateList", simulateList.data);
      commit("changeSimulateCount", simulateList.count);
    },
    // 模型构建表单提交
    async modelConfigAction({ commit }, payload: any) {
      const response = await postModelConfig(
        payload.pageUrl,
        payload.modelData
      );
      console.log(response);
    },
  },
};

export default modelModule;
