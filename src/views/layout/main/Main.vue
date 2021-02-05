<template>
  <v-app>
    <AppBar @click:drawer="drawer = !drawer" />
    <NavBar v-model="drawer" />
    <v-main >
      <c-col cols="12" class="fill-height" style="background-color: #F5F5F5;">
        <transition>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </c-col>
    </v-main>
   
   <Footer />
  </v-app>
</template>
<script>
import AppBar from "./AppBar";
import NavBar from "./NavBar";
import Footer from "./Footer";
export default {
  components: {
    AppBar,
    NavBar,
    Footer
  },
  data: () => ({
    drawer: false,
  })
};
</script>
