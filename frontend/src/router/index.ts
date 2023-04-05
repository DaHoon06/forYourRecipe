import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/home/HomeView.vue"),
  },
  {
    path: "/recipe",
    name: "recipe",
    component: () => import("@/views/recipe/RecipeView.vue"),
    children: [
      {
        path: "all",
        name: "all-recipe",
        component: () => import("@/components/recipe/AllRecipeLists.vue"),
      },
      {
        path: "lists",
        name: "recipeLists",
        props: true,
        component: () => import("@/components/recipe/RecipeLists.vue"),
      },
      {
        path: "detail/:id",
        name: "recipeDetail",
        component: () => import("@/components/recipe/RecipeDetail.vue"),
      },
      {
        path: "post/:id?",
        name: "recipePost",
        component: () => import("@/components/recipe/RecipePost.vue"),
        meta: { authorized: true },
      },
      {
        path: "search/:keyword",
        name: "recipeSearch",
        component: () => import("@/components/recipe/RecipeSearch.vue"),
      },
      {
        path: "favorite",
        name: "favoriteLists",
        component: () => import("@/components/recipe/FavoriteLists.vue"),
        meta: { authorized: true },
      },
    ],
  },
  {
    path: "/not-found-page",
    name: "not-found-page",
    component: () => import("@/views/exception/NotFound.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/not-found-page",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const { matched } = to;
  const isLogin = await store.getters["utilModule/isLogin"];
  const authorized = matched.some((routerInfo) => routerInfo.meta.authorized);
  if (authorized && !isLogin) {
    console.log(authorized, isLogin);
    store.commit("tempModule/setDialogTitle", "로그인이 필요합니다.");
    store.commit("tempModule/setDialog", true);
    next({ path: "/" });
  }
  next();
});

export default router;
