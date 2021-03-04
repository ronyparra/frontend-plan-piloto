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
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/dashboard/Dashboard.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/",
        name: "Dashboard",
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/dashboard/Home.vue"),
      },
    ],
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
    path: "/pendiente",

    component: () =>
      import(
        /* webpackChunkName: "Pendiente" */ "../views/pendiente/Pendiente.vue"
      ),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/",
        name: "Pendientes",
        component: () =>
          import(
            /* webpackChunkName: "Pendiente" */ "../views/pendiente/List.vue"
          ),
      },
      {
        path: "add",
        name: "Registrar Pendiente",
        component: () =>
          import(
            /* webpackChunkName: "Pendiente ADD" */ "../views/pendiente/Form.vue"
          ),
      },
      {
        path: "edit/:id",
        name: "Modificar Pendiente",
        component: () =>
          import(
            /* webpackChunkName: "Pendiente EDIT" */ "../views/pendiente/Form.vue"
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
      import(
        /* webpackChunkName: "Concepto" */ "../views/concepto/Concepto.vue"
      ),
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
    path: "/usuario",
    name: "",
    component: () =>
      import(/* webpackChunkName: "Usuario" */ "../views/usuario/Usuario.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/",
        name: "Usuarios",
        component: () =>
          import(
            /* webpackChunkName: "Usuarios" */ "../views/usuario/List.vue"
          ),
      },
      {
        path: "add",
        name: "Registrar Usuario",
        component: () =>
          import(
            /* webpackChunkName: "Usuario ADD" */ "../views/usuario/Form.vue"
          ),
      },
      {
        path: "edit/:id",
        name: "Modificar Usuario",
        component: () =>
          import(
            /* webpackChunkName: "Usuario EDIT" */ "../views/usuario/Form.vue"
          ),
      },
    ],
  },
  {
    path: "/analytics",
    component: () =>
      import(
        /* webpackChunkName: "Analytics" */ "../views/analytics/Analytics.vue"
      ),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "actividad",
        name: "Analytics Actividad",
        component: () =>
          import(
            /* webpackChunkName: "Cliente" */ "../views/analytics/Actividad.vue"
          ),
      },
      {
        path: "pendiente",
        name: "Analytics Pendientes",
        component: () =>
          import(
            /* webpackChunkName: "Cliente" */ "../views/analytics/Pendiente.vue"
          ),
      },
      {
        path: "cliente",
        name: "Analytics Clientes",
        component: () =>
          import(
            /* webpackChunkName: "Cliente" */ "../views/analytics/Clientes.vue"
          ),
      },
      {
        path: "concepto",
        name: "Analytics Conceptos",
        component: () =>
          import(
            /* webpackChunkName: "Cliente" */ "../views/analytics/Concepto.vue"
          ),
      },
    ],
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
