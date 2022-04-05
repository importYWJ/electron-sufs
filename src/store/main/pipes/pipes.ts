import { Module } from "vuex";
import { IRootState } from "@/store/types";
import { IPipeState } from "./types";
import { getPipeFields, addPipeConfig } from "@/service/main/pipes/pipes";

const pipeModule: Module<IPipeState, IRootState> = {
  namespaced: true,
  state() {
    return {
      conduitFieldsList: [],
      junctionFieldsList: [],
      outfallFieldsList: [],
    };
  },
  mutations: {
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
