<template>
  <div>
     <c-app-bar app dense flat style="z-index: -1"></c-app-bar>

    <div class="title">
      Hola, <span class="font-weight-black">{{ getUserInfo.nombre }}</span>
      <Pendientes />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Pendientes from "./Pendientes";
export default {
  components: {
    Pendientes,
  },
  computed: {
    ...mapGetters("auth", ["getUserInfo"]),
  },
};
</script>
