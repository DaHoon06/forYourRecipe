import { Module } from "vuex";
import { RootState } from "@/store";

export interface UtilState {
  currentPath: number;
}

const getDefaultState = () => {
  return {
    currentPath: 0,
  };
};

const state = getDefaultState();

export const utilModule: Module<UtilState, RootState> = {
  namespaced: true,
  state: state,
  mutations: {
    setCurrentPath(state: UtilState, data: number): void {
      state.currentPath = data;
    },
  },
  actions: {},
  getters: {
    currentPath: (state: UtilState) => {
      return state.currentPath;
    },
  },
};
