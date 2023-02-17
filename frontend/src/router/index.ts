import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/recipe",
    name: "recipe",
    component: () => import("@/views/recipe/RecipeView.vue"),
    children: [
      {
        path: "detail/:id",
        name: "recipeDetail",
        component: () => import("@/components/recipe/RecipeDetail.vue"),
      },
      {
        path: "post",
        name: "recipePost",
        component: () => import("@/components/recipe/RecipePost.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
