import { createStore, Store, useStore as useVuexStore } from "vuex";
import { IRootState, IStoreType } from "./types";
import loginModule from "./login/login";
import modelModule from "./main/models/models";

const store = createStore<IRootState>({
  state: {
    owner: "nnu-gis-427",
  },
  mutations: {},
  actions: {},
  modules: {
    loginModule,
    modelModule,
  },
});

export function setupStore(): void {
  store.dispatch("loginModule/loadLocalLogin");
}

export function useStore(): Store<IStoreType> {
  return useVuexStore();
}

export default store;
