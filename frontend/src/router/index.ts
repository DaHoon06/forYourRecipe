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
      },
      {
        path: "search/:keyword",
        name: "recipeSearch",
        component: () => import("@/components/recipe/RecipeSearch.vue"),
      },
    ],
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/admin/AdminView.vue"),
    children: [
      {
        path: "recipe/post/:id?",
        name: "adminRecipePost",
        component: () => import("@/components/admin/AdminRecipePost.vue"),
      },
    ],
  },
  {
    path: "/not-found-page",
    name: "not-found-page",
    component: () => import("@/views/NotFound.vue"),
    meta: { unauthorized: true },
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
  return next();
});

export default router;
