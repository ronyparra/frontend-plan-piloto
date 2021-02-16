import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login/Login.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/",
    name: "",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/cliente",

    component: () =>
      import(/* webpackChunkName: "Cliente" */ "../views/cliente/Cliente.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/",
        name: "Clientes",
        component: () =>
          import(/* webpackChunkName: "Cliente" */ "../views/cliente/List.vue"),
      },
      {
        path: "add",
        name: "Registrar Cliente",
        component: () =>
          import(
            /* webpackChunkName: "Cliente ADD" */ "../views/cliente/Form.vue"
          ),
      },
      {
        path: "edit/:id",
        name: "Modificar Cliente",
        component: () =>
          import(
            /* webpackChunkName: "Cliente EDIT" */ "../views/cliente/Form.vue"
          ),
      },
    ],
  },
  {
    path: "/actividad",
    name: "",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/actividad/Actividad.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/",
        name: "Actividades",
        component: () =>
          import(
            /* webpackChunkName: "Actividades" */ "../views/actividad/List.vue"
          ),
      },
      {
        path: "add",
        name: "Registrar Actividad",
        component: () =>
          import(
            /* webpackChunkName: "Actividad ADD" */ "../views/actividad/Form.vue"
          ),
      },
      {
        path: "edit/:id",
        name: "Modificar Actividad",
        component: () =>
          import(
            /* webpackChunkName: "Actividad EDIT" */ "../views/actividad/Form.vue"
          ),
      },
    ],
  },
  {
    path: "/concepto",
    name: "",
    component: () =>
      import(/* webpackChunkName: "Concepto" */ "../views/concepto/Concepto.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/",
        name: "Conceptos",
        component: () =>
          import(
            /* webpackChunkName: "Conceptos" */ "../views/concepto/List.vue"
          ),
      },
      {
        path: "add",
        name: "Registrar Concepto",
        component: () =>
          import(
            /* webpackChunkName: "Concepto ADD" */ "../views/concepto/Form.vue"
          ),
      },
      {
        path: "edit/:id",
        name: "Modificar Concepto",
        component: () =>
          import(
            /* webpackChunkName: "Concepto EDIT" */ "../views/concepto/Form.vue"
          ),
      },
    ],
  },

  {
    path: "/pendiente",
    name: "Pendientes",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/mas",
    name: "Mas",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters["auth/isLogin"];
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isAuthenticated) {
      return next();
    }
    next("/login");
  }
  next();
});

export default router;
