<template>
  <v-app>
    <v-main>
      <c-col cols="12" class="fill-height" style="background-color: #F5F5F5;">
        <transition>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </c-col>
    </v-main>
    <RequestEvents />
    <Footer />
  </v-app>
</template>
<script>


import Footer from "./Footer";
import RequestEvents from "@/views/request/RequestEvents";
export default {
  components: {
    RequestEvents,
    Footer,
  },

};
</script>
