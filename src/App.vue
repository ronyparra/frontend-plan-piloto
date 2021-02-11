<template>
    <component :is="layout"></component>
</template>

<script>
import { mapGetters } from "vuex";
import Main from "./views/layout/main/Main";
import Login from "./views/layout/login/Login";
export default {
  components: {
    Main,
    Login
  },
  computed: {
    ...mapGetters("auth", ["isLogin"]),
    layout() {
      return this.isLogin ? "Main" : "Login";
    },
  },
};
</script>
