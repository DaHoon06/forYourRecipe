import { Module } from "vuex";
import { STORE } from "@/interfaces/store";
import { RootState } from "@/store";
import { ins } from "@/lib/axios";

interface Token {
  accessToken: string;
  refreshToken: string;
}

interface UserImpl {
  uid: string;
  displayName: string;
  email: string;
  stsTokenManager: Token;
}

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
  mutations: {
    setUserData: (state: STORE.UserState, payload: STORE.UserState) => {
      state.name = payload.name;
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    },
    resetUserData: (state: STORE.UserState) => {
      Object.assign(state, getDefaultState());
    },
  },
  actions: {
    login: async (context, payload: UserImpl) => {
      try {
        const { stsTokenManager, email, displayName, uid } = payload;
        const { refreshToken, accessToken } = stsTokenManager;
        const userData = {
          accessToken,
          refreshToken,
          name: displayName,
        };

        await context.commit("setUserData", userData);
        const sendData = {
          name: displayName,
          id: uid,
          email,
        };
        const { data } = await ins.post("/users/sign-in", sendData);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    },
  },
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
