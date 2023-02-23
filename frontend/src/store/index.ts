import { createStore } from "vuex";
import { recipeModule, RecipeState } from "@/store/modules/recipe";
import { utilModule, UtilState } from "@/store/modules/util";

export interface RootState {
  Recipe: RecipeState;
  Util: UtilState;
}

export default createStore({
  modules: {
    recipeModule,
    utilModule,
  },
});
