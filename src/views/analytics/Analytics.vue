<template>
  <div class="fill-height">
    <c-app-bar app flat style="z-index: -3"></c-app-bar>
    <div class="title fill-height">
      <c-card outlined class="fill-height d-flex flex-row">
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
            <v-card color="blue-grey lighten-5" class="fill-height">
               <c-container filled>
              <div class="ml-2 mb-4 d-flex justify-space-between">
                <div class="subtitle-1 font-weight-medium">
                  {{getTitle($route.path)}}
                </div>
                <div class="caption mt-1 font-italic">
                  {{ getParams.desde }}/{{ getParams.hasta }}
                </div>
              </div>
              <transition>
                <router-view></router-view>
              </transition>
              </c-container>
            </v-card>
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
        title: "Saldos de Actividades",
        icon: "assignment",
        path: "/analytics/",
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
    ],
  }),
  computed: {
    ...mapGetters("analytics", ["getParams"]),
  },
  methods: {
    getTitle(current_path) {
      const path = this.nav.find(({ path }) => path === current_path);
      return path?.title || ''
    },
  },
};
</script>
<style lang="css" scoped>
.v-tab {
  min-width: 50px;
}
</style>
