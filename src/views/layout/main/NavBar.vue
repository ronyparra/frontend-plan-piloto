<template>
  <c-navigation-drawer class="mt-lg-1" style="z-index: 99" :value="value"  app :clipped="$vuetify.breakpoint.lgAndUp">
    <template v-slot:prepend>
      <c-list-item two-line>
        <c-list-item-avatar>
          <c-icon large>account_circle</c-icon>
        </c-list-item-avatar>

        <c-list-item-content>
          <c-list-item-title
            >{{ getUserInfo.nombre }}
            {{ getUserInfo.apellido }}</c-list-item-title
          >
          <c-list-item-subtitle>Conectado</c-list-item-subtitle>
        </c-list-item-content>
      </c-list-item>
    </template>
    <c-divider></c-divider>
    <c-list nav dense>
      <c-list-item-group active-class="deep-purple--text text--accent-4">
        <c-list-item v-for="(item, i) of navs" :key="i" :to="item.to">
          <c-list-item-icon>
            <c-icon>{{ item.icon }}</c-icon>
          </c-list-item-icon>
          <c-list-item-content>
            <c-list-item-title>{{ item.title }}</c-list-item-title>
          </c-list-item-content>
        </c-list-item>
      </c-list-item-group>
    </c-list>
    <c-divider></c-divider>
    <c-list nav dense>
      <c-list-item-group>
        <c-list-item @click="logout()">
          <c-list-item-icon>
            <c-icon>logout</c-icon>
          </c-list-item-icon>
          <c-list-item-content>
            <c-list-item-title>Cerrar Sesion</c-list-item-title>
          </c-list-item-content>
        </c-list-item>
      </c-list-item-group>
    </c-list>
  </c-navigation-drawer>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { navs } from "./constants";
export default {
  props: {
    value: Boolean,
  },
  computed: {
    ...mapGetters("auth", ["getUserInfo"]),
    navs: () => navs(),
  },
  methods:{
    ...mapActions('auth',['logout'])
  }
};
</script>
