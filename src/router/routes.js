const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/login",
        name: "loginPage",
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "/faleconosco",
        name: "faleConoscoPage",
        component: () => import("pages/faleConosco.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
