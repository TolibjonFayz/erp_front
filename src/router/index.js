import { createRouter, createWebHistory } from "vue-router";
import admin from "./admin";
import auth from "./auth";
import director from "./director";
import finance from "./finance";
import teacher from "./teacher";
import notFound from "./not-found";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [admin, auth, director, finance, teacher, notFound],
});

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem("token");
//   const name = to.name === "auth";
//   if (!token && !name) {
//     return next({ name: "auth" });
//   } else {
//     if (token && name) {
//       return next({ name: "admin" });
//     } else {
//       next();
//     }
//   }
// });

export default router;
