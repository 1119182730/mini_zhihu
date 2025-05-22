import { createRouter, createWebHistory } from "vue-router";
import Login from "@views/login";
import Section from "@views/section";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Section },
    { path: "/login", component: Login },
  ],
});

export default router;
