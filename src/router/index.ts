import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { firstMenu } from "@/utils/map-menus";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/main",
    name: "main",
    component: () => import("../views/main/main.vue"),
    children: [],
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.path === "/main") {
    return firstMenu.url;
  }
});

export default router;
