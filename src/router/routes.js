const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/LandingPage.vue") },
      {
        path: "/login",
        name: "login",
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "/cadastro",
        name: "cadastro",
        component: () => import("src/pages/CadastroPage.vue"),
      },
      {
        path: "/esqueci-senha",
        name: "esqueci-senha",
        component: () => import("src/pages/EsqueciSenhaPage.vue"),
      },
      {
        path: "/faleconosco",
        name: "faleConosco",
        component: () => import("src/pages/FaleConoscoPage.vue"),
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
