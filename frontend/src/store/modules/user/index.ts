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
    img: "",
    uid: "",
    favoriteRecipes: [],
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
      state.img = payload.img;
      state.uid = payload.uid;
      state.favoriteRecipes = payload.favoriteRecipes;
    },
    resetUserData: (state: STORE.UserState) => {
      Object.assign(state, getDefaultState());
    },
    setFavoriteLists: (state: STORE.UserState, payload: string[]) => {
      state.favoriteRecipes = payload;
    },
  },
  actions: {
    login: async (context, payload: UserImpl) => {
      try {
        const { stsTokenManager, email, displayName, uid } = payload;
        const { refreshToken, accessToken } = stsTokenManager;

        const sendData = {
          name: displayName,
          id: uid,
          email,
        };
        const { data } = await ins.post("/users/sign-in", sendData);
        const { name, img, favoriteRecipes } = data;
        const userData = {
          accessToken,
          refreshToken,
          name,
          img,
          uid,
          favoriteRecipes,
        };
        await context.commit("setUserData", userData);
      } catch (e) {
        console.log(e);
      }
    },
  },
  getters: {
    getAccessToken: (state: STORE.UserState): string => {
      return state.accessToken;
    },
    getRefreshToken: (state: STORE.UserState): string => {
      return state.refreshToken;
    },
    getName: (state: STORE.UserState): string => {
      return state.name;
    },
    getProfileImg: (state: STORE.UserState): string => {
      return state.img;
    },
    getUid: (state: STORE.UserState): string => {
      return state.uid;
    },
    getFavoriteRecipe: (state: STORE.UserState): string[] => {
      return state.favoriteRecipes;
    },
  },
};
