import { createStore } from "vuex";
import {utilModule} from "@/store/modules/util";

const store = createStore({
  state: require('@/store/index').state,
  getters: require('@/store/index').getters,
  modules: {
    recipeModule: {
      namespaced: true,
      state: require("@/store/modules/recipe").state,
      getters: require("@/store/modules/recipe").getters,
      actions: require("@/store/modules/recipe").actions,
      mutations: require("@/store/modules/recipe").mutations
    },
    utilModule: {
      namespaced: true,
      state: require("@/store/modules/util").state,
      getters: require("@/store/modules/util").getters,
      actions: require("@/store/modules/util").actions,
      mutations: require("@/store/modules/util").mutations
    }
  }
});

export default store;
