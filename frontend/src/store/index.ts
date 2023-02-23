import { createStore } from "vuex";
import { recipeModule, RecipeState } from "@/store/modules/recipe";
import { utilModule, UtilState } from "@/store/modules/util";
import createPersistedState from "vuex-persistedstate";

export interface RootState {
  Recipe: RecipeState;
  Util: UtilState;
}

export default createStore({
  plugins: [
    createPersistedState({
      paths: ["utilModule"],
    }),
  ],
  modules: {
    recipeModule,
    utilModule,
  },
});
