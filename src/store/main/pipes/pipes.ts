import { Module } from "vuex";
import { IRootState } from "@/store/types";
import { IPipeState, IPipeModelItem } from "./types";
import {
  getTableList,
  getPipeFields,
  addPipeConfig,
} from "@/service/main/pipes/pipes";

const pipeModule: Module<IPipeState, IRootState> = {
  namespaced: true,
  state() {
    return {
      pipeModelList: [],
      pipeModelCount: 0,
      conduitFieldsList: [],
      junctionFieldsList: [],
      outfallFieldsList: [],
    };
  },
  mutations: {
    changePipeModelList(state, pipeModelList: Array<IPipeModelItem>) {
      state.pipeModelList = pipeModelList;
    },
    changePipeModelCount(state, pipeModelCount: number) {
      state.pipeModelCount = pipeModelCount;
    },
    changeConduitFieldsList(state, conduitFields) {
      state.conduitFieldsList = conduitFields;
    },
    changeJunctionFieldsList(state, junctionFields) {
      state.junctionFieldsList = junctionFields;
    },
    changeOutfallFieldsList(state, outfallFields) {
      state.outfallFieldsList = outfallFields;
    },
  },
  actions: {
    // 模型列表请求
    async loadModelListAction({ commit }, payload: any) {
      const modelList = await getTableList(payload.pageUrl, payload.queryInfo);
      commit("changePipeModelList", modelList.data);
      commit("changePipeModelCount", modelList.count);
    },
    async loadPipeFieldsAction({ commit }, payload) {
      const pipeFields = await getPipeFields(payload.pageUrl, payload.shpData);
      if (payload.pipeType === "Conduit") {
        commit("changeConduitFieldsList", pipeFields.data);
      } else if (payload.pipeType === "Junction") {
        commit("changeJunctionFieldsList", pipeFields.data);
      } else if (payload.pipeType === "Outfall") {
        commit("changeOutfallFieldsList", pipeFields.data);
      }
    },
    async pipeConfigAction({ commit }, payload: any) {
      const response = await addPipeConfig(payload.pageUrl, payload.modelData);
      console.log(response);
    },
  },
};

export default pipeModule;
