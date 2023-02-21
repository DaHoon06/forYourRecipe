import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import * as path from "path";

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
        path: "post",
        name: "recipePost",
        component: () => import("@/components/recipe/RecipePost.vue"),
      },
    ],
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/admin/AdminView.vue"),
    children: [
      {
        path: "recipe/post",
        name: "adminRecipePost",
        component: () => import("@/components/admin/AdminRecipePost.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
