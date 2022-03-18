import { Module } from "vuex";
import { IModelState, IModelItem } from "./types";
import { IRootState } from "@/store/types";
import { getTableList } from "@/service/main/models/models";

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
    async loadModelListAction({ commit }, payload: any) {
      const modelList = await getTableList(payload.pageUrl, payload.queryInfo);
      commit("changeModelList", modelList.data);
      commit("changeModelCount", modelList.count);
    },
    async loadSimulateListAction({ commit }, payload: any) {
      const simulateList = await getTableList(
        payload.pageUrl,
        payload.queryInfo
      );
      commit("changeSimulateList", simulateList.data);
      commit("changeSimulateCount", simulateList.count);
    },
  },
};

export default modelModule;
