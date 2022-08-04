<template>
  <c-navigation-drawer style="z-index: 8;" class="mt-lg-1"  :value="value"  app :clipped="$vuetify.breakpoint.lgAndUp">
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar>
          <c-icon large>account_circle</c-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            >{{ getUserInfo.nombre }}
            {{ getUserInfo.apellido }}</v-list-item-title
          >
          <v-list-item-subtitle>Conectado</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-divider></v-divider>
    <c-list nav dense>
      <v-list-item-group active-class="deep-purple--text text--accent-4">
        <v-list-item v-for="(item, i) of navs" :key="i" :to="item.to">
          <v-list-item-icon>
            <c-icon>{{ item.icon }}</c-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </c-list>
    <v-divider></v-divider>
    <c-list nav dense>
      <v-list-item-group>
        <v-list-item @click="logout()">
          <v-list-item-icon>
            <c-icon>logout</c-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Cerrar Sesion</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </c-list>
  </c-navigation-drawer>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { navs } from './constants'
export default {
  props: {
    value: Boolean
  },
  computed: {
    ...mapGetters('auth', ['getUserInfo']),
    navs: () => navs()
  },
  methods: {
    ...mapActions('auth', ['logout'])
  }
}
</script>
