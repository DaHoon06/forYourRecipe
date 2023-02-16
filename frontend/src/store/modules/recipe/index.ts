import { Module } from "vuex";
import { RootState } from "@/store";

export interface RecipeState {
  id: number;
  name: string;
}

export const recipeModule: Module<RecipeState, RootState> = {
  namespaced: true,
  mutations: {},
  actions: {},
  getters: {},
};
