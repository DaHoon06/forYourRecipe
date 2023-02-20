import { Module } from "vuex";
import { RootState } from "@/store";

export interface RecipeState {
  _id: string;
  name: string;
  img: string;
  selected?: boolean;
}

export const recipeModule: Module<RecipeState[], RootState> = {
  namespaced: true,
  state: [],
  mutations: {
    saveIngredients(state: RecipeState[], data): void {
      for (let i = 0; i < data.length; i++) {
        state.push(data[i]);
      }
    },
    reset(state: RecipeState[], data): void {
      state = [];
    },
  },
  actions: {},
  getters: {
    getIngredients: (state) => {
      return state;
    },
  },
};
