import { Module } from "vuex";
import { RootState } from "@/store";
import { STORE } from "@/interfaces/store";

const getDefaultState = () => {
  return {
    currentPath: 0,
    isLogin: false,
  };
};

const state = getDefaultState();

export const utilModule: Module<STORE.UtilState, RootState> = {
  namespaced: true,
  state: state,
  mutations: {
    setCurrentPath(state: STORE.UtilState, data: number): void {
      state.currentPath = data;
    },
    setIsLogin(state: STORE.UtilState, payload: boolean): void {
      state.isLogin = payload;
    },
  },
  actions: {},
  getters: {
    currentPath: (state: STORE.UtilState) => {
      return state.currentPath;
    },
    isLogin: (state: STORE.UtilState) => {
      return state.isLogin;
    },
  },
};
