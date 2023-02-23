import { Module } from "vuex";
import { RootState } from "@/store";
import { STORE } from "@/interfaces/store";

const getDefaultState = () => {
  return {
    ingredients: [],
  };
};

interface STATE {
  ingredients: STORE.RecipeState[];
}

const state = getDefaultState();

export const recipeModule: Module<STATE, RootState> = {
  namespaced: true,
  state: state,
  mutations: {
    saveIngredients(state: STATE, data: STORE.RecipeState[]): void {
      for (let i = 0; i < data.length; i++) {
        state.ingredients.push(data[i]);
      }
    },
    reset(state: STATE): void {
      Object.assign(state, getDefaultState());
    },
  },
  actions: {},
  getters: {
    getIngredients: (state: STATE) => {
      return state.ingredients;
    },
  },
};
