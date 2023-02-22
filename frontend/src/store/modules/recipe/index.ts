import { Module } from "vuex";
import { RootState } from "@/store";

export interface RecipeState {
  _id: string;
  name: string;
  img: string;
  selected?: boolean;
}

const getDefaultState = () => {
  return {
    ingredients: [],
  };
};

interface STATE {
  ingredients: RecipeState[];
}

const state = getDefaultState();

export const recipeModule: Module<STATE, RootState> = {
  namespaced: true,
  state: state,
  mutations: {
    saveIngredients(state: STATE, data: RecipeState[]): void {
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
