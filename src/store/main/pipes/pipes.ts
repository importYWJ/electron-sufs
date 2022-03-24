import { Module } from "vuex";
import { IRootState } from "@/store/types";
import { IPipeState } from "./types";
import { getPipeFields } from "@/service/main/pipes/pipes";

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
        commit("changeConduitFieldsList", pipeFields);
      } else if (payload.pipeType === "Junction") {
        commit("changeJunctionFieldsList", pipeFields);
      } else if (payload.pipeType === "Outfall") {
        commit("changeOutfallFieldsList", pipeFields);
      }
    },
  },
};

export default pipeModule;
