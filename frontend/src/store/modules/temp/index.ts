import { Module } from "vuex";
import { STORE } from "@/interfaces/store";
import { RootState } from "@/store";

const getDefaultsState = () => {
  return {
    showDialog: false,
    dialogTitle: "",
    dialogBody: "",
  };
};

const state = getDefaultsState();

export const tempModule: Module<STORE.TempState, RootState> = {
  namespaced: true,
  state: state,
  mutations: {
    setDialog(state: STORE.TempState, payload: boolean): void {
      state.showDialog = payload;
    },
    setDialogTitle(state: STORE.TempState, payload: string): void {
      state.dialogTitle = payload;
    },
    setDialogBody(state: STORE.TempState, payload: string): void {
      state.dialogBody = payload;
    },
  },
  getters: {
    dialog: (state: STORE.TempState) => {
      return state.showDialog;
    },
    dialogTitle: (state: STORE.TempState) => {
      return state.dialogTitle;
    },
    dialogBody: (state: STORE.TempState) => {
      return state.dialogBody;
    },
  },
};
