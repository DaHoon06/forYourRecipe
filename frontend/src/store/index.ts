import { createStore } from "vuex";
import { recipeModule, RecipeState } from "@/store/modules/recipe";

export interface RootState {
  Recipe: RecipeState;
}

export default createStore({
  modules: {
    recipeModule,
  },
});
