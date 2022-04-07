import { Module } from "vuex";
import { IModelState, IModelItem } from "./types";
import { IRootState } from "@/store/types";
import {
  getTableList,
  addModelConfig,
  deleteModelConfig,
  queryModelConfig,
  runModel,
} from "@/service/main/models/models";

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
      const response = await addModelConfig(payload.pageUrl, payload.modelData);
      console.log(response);
    },
    // 删除模型
    async modelDeleteAction({ commit }, payload: any) {
      const response = await deleteModelConfig(
        payload.pageUrl,
        payload.modelID
      );
      console.log(response);
    },
    // 编辑/查询模型
    async modelQueryAction({ commit }, payload: any) {
      const result = await queryModelConfig(payload.pageUrl, payload.modelID);
      console.log(result);
    },
    // 模拟构建表单提交
    async simulateConfigAction({ commit }, payload: any) {
      const response = await addModelConfig(
        payload.pageUrl,
        payload.simulateData
      );
      console.log(response);
    },
    // 情景运行
    async modelRunShowAction({ commit }, payload: any) {
      // 返回值格式: {status: 0/1}
      return new Promise((resolve, reject) => {
        const response = runModel(
          payload.pageUrl,
          payload.modelID,
          payload.simulateID
        );
        resolve(response);
      });
    },
  },
};

export default modelModule;
