<template>
  <v-app>
    <AppBar @click:drawer="drawer = !drawer" />
    <NavBar v-model="drawer" />
    <c-main>
      <c-col cols="12" class="fill-height" style="background-color: white;">
        <transition>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </c-col>
    </c-main>
    <RequestEvents />
    <Footer class="d-sm-none" />
  </v-app>
</template>
<script>
import AppBar from "./AppBar";
import NavBar from "./NavBar";
import Footer from "./Footer";
import RequestEvents from "@/views/request/RequestEvents";
export default {
  components: {
    RequestEvents,
    AppBar,
    NavBar,
    Footer,
  },
  data: () => ({
    drawer: false,
  }),
};
</script>
