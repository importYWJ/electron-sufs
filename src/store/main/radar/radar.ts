import { changeRadarList } from "@/service/main/models/models";
import { IRootState } from "@/store/types";
import { Module } from "vuex";
import { IRadarState, IRadarItem } from "./types";
const radarModule: Module<IRadarState, IRootState> = {
  namespaced: true,
  state() {
    return {
      zhList: [],
      zdrList: [],
      kdpList: [],
    };
  },
  mutations: {
    changeZhList(state, payload: Array<Array<IRadarItem>>) {
      state.zhList = payload;
    },
    changeZdrList(state, payload: Array<Array<IRadarItem>>) {
      state.zdrList = payload;
    },
    changeKdpList(state, payload: Array<Array<IRadarItem>>) {
      state.kdpList = payload;
    },
  },
  actions: {
    // 雷达选择
    async radarSelectAction({ commit }, payload: any) {
      const result = await changeRadarList(payload.pageUrl, payload.radarList);
      commit("changeZhList", result.zh);
      commit("changeZdrList", result.zdr);
      commit("changeKdpList", result.kdp);
    },
  },
};

export default radarModule;
