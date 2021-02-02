<template>
  <div>
    <div class="title">
      Hola, <span class="font-weight-black">{{ getUserInfo.nombre }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("auth", ["getUserInfo"]),
  },
};
</script>
