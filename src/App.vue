<template>
    <component :is="layout"></component>
</template>

<script>
import { mapGetters } from 'vuex'
import Main from './layout/main/Main'
import Login from './layout/login/Login'
export default {
  components: {
    Main,
    Login
  },
  computed: {
    ...mapGetters('auth', ['isLogin']),
    layout () {
      return this.isLogin ? 'Main' : 'Login'
    }
  }
}
</script>
<style>
.container {
  max-width: 1144px !important;
}
</style>
