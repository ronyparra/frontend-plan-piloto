<template>
  <v-app>
    <AppBar @click:drawer="drawer = !drawer" />
    <NavBar v-model="drawer" />
    <v-main>
      <c-col cols="12">
        <transition>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </c-col>
    </v-main>
  </v-app>
</template>
<script>
import AppBar from "./AppBar";
import NavBar from "./NavBar";
export default {
  components: {
    AppBar,
    NavBar,
  },
  data: () => ({
    drawer: false,
  }),
};
</script>
