import { createRouter, createWebHistory } from "vue-router";
import login from "@views/";
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", component: login }],
});

export default router;
