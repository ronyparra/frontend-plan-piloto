<template>
  <div class="fill-height">
    <c-app-bar app dense flat style="z-index: -1"></c-app-bar>
    <div class="title fill-height">
      <c-card outlined elevation="1" class="fill-height d-flex flex-row">
        <v-tabs vertical>
          <v-tab v-for="item in nav" :key="item.path" exact :to="item.path">
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-tab>

          <v-spacer></v-spacer>
          <v-tab to="/analytics/filtros">
            <v-icon>
              build
            </v-icon>
          </v-tab>
          <v-tabs-items vertical class="fill-height">
            <c-card elevation="0" color="blue-grey lighten-5" class="fill-height">
              <c-container filled>
                <div class="ml-2 mb-4 d-flex justify-space-between">
                  <div class="subtitle-1 font-weight-medium">
                    {{ getTitle($route.path) }}
                  </div>
                  <div class="caption mt-1 font-italic">
                    {{ getParams.desde }}/{{ getParams.hasta }}
                    <c-progress-circular
                      indeterminate
                      :size="18"
                      v-if="isLoading"
                    ></c-progress-circular>
                  </div>
                </div>
                <transition>
                  <router-view></router-view>
                </transition>
              </c-container>
            </c-card>
          </v-tabs-items>
        </v-tabs>
      </c-card>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    nav: [
      {
        title: "Saldos",
        icon: "assignment",
        path: "/analytics/",
      },
      {
        title: "Cobros Terminados",
        icon: "receipt",
        path: "/analytics/cobro",
      },
      {
        title: "Rendimiento en pendientes",
        icon: "query_builder",
        path: "/analytics/pendiente",
      },
      {
        title: "Top Clientes",
        icon: "account_box",
        path: "/analytics/cliente",
      },
      {
        title: "Top Conceptos",
        icon: "add_shopping_cart",
        path: "/analytics/concepto",
      },
      {
        title: "Top Tecnicos",
        icon: "engineering",
        path: "/analytics/tecnico",
      },
      {
        title: 'Top Categorias',
        icon: 'category',
        path: '/analytics/categoria'
      },
      
    ],
  }),
  computed: {
    ...mapGetters("analytics", ["getParams", "isLoading"]),
  },
  methods: {
    getTitle(current_path) {
      const path = this.nav.find(({ path }) => path === current_path);
      return path?.title || "";
    },
  },
};
</script>
<style lang="css" scoped>
.v-tab {
  min-width: 50px;
}
</style>
