import { createRouter, createWebHashHistory } from "vue-router";

const route = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/works",
    name: "works",
    component: () => import("../views/Works.vue"),
    children: [
      // {
      //   path: "/works/web",
      //   name: "web",
      //   component: () => import("../views/Web.vue"),
      // },
      {
        path: "/works/design",
        name: "design",
        component: () => import("../views/Design.vue"),
      },
      {
        path: "/works/photo",
        name: "photo",
        component: () => import("../views/Photo.vue"),
      },
    ],
  },
  {
    path: "/blog",
    name: "blog",
    // component: Blog,
    children: [
      {
        path: "/blog/article",
        name: "article",
        component: () => import("../views/Article.vue"),
        meta: { requiresAuth: true },
        children: [
          {
            path: ":id",
            name: "article-detail",
            component: () => import("../components/blog/ArticleDetail.vue"),
            props: (route) => ({
              id: route.params.id,
              preview: route.query.preview,
            }),
          },
        ],
      },
      {
        path: "/blog/technique",
        name: "technique",
        component: () => import("../views/TechniqueBlog.vue"),
      },
    ],
  },

  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes: route,
});
// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (!localStorage.getItem("authToken")) {
//       next("/login");
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });
export default router;
