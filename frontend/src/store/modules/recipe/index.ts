import { Module } from "vuex";
import { RootState } from "@/store";

export interface RecipeState {}

export const recipeModule: Module<RecipeState, RootState> = {
  namespaced: true,
  mutations: {},
  actions: {},
  getters: {},
};
