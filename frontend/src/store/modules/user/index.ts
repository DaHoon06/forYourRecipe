import { Module } from "vuex";
import { STORE } from "@/interfaces/store";
import { RootState } from "@/store";

const getDefaultState = () => {
  return {
    accessToken: "",
    refreshToken: "",
    name: "",
  };
};
const state = getDefaultState();

export const userModule: Module<STORE.UserState, RootState> = {
  namespaced: true,
  state: state,
  mutations: {},
  actions: {},
  getters: {
    getAccessToken: (state: STORE.UserState) => {
      return state.accessToken;
    },
    getRefreshToken: (state: STORE.UserState) => {
      return state.refreshToken;
    },
    getName: (state: STORE.UserState) => {
      return state.name;
    },
  },
};
