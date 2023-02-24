import { createStore } from "vuex";
import { recipeModule } from "@/store/modules/recipe";
import { utilModule } from "@/store/modules/util";
import createPersistedState from "vuex-persistedstate";
import { STORE } from "@/interfaces/store";
import { userModule } from "@/store/modules/user";

export interface RootState {
  Recipe: STORE.RecipeState;
  Util: STORE.UtilState;
  User: STORE.UserState;
}

export default createStore({
  plugins: [
    createPersistedState({
      paths: ["recipeModule", "utilModule", "userModule"],
    }),
  ],
  modules: {
    recipeModule,
    utilModule,
    userModule,
  },
});
