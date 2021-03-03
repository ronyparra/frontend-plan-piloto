<template>
  <c-bottom-sheet :value="value" @input="$emit('input', $event)">
    <c-sheet class="text-center rounded-t-xl" height="170px">
      <c-card-title class="d-flex justify-center mt-2"
        >Finalizar el Pendiente</c-card-title
      >
      <div class="mt-n2">Que desear hacer?</div>
      <c-container class="d-flex flex-row">
        <c-col cols="6"
          ><c-btn text elevation="2" color="primary" block rounded @click="terminar()"
            >Terminar</c-btn
          ></c-col
        >
        <c-col cols="6"
          ><c-btn block rounded color="primary" @click="asentar()"
            >Asentar</c-btn
          ></c-col
        >
      </c-container>
    </c-sheet>
  </c-bottom-sheet>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: {
    value: Boolean,
  },
  methods: {
    ...mapActions("pendiente", ["setChangeStatus", "fetchDashboard"]),
    async terminar() {
      const form = {
        idpendiente: this.$route.params.id,
        activo: false,
      };
     const response = await  this.setChangeStatus(form);
     if(response.success) {
        this.$emit('input', false);
        this.fetchDashboard();
        this.$router.replace({ path: "/pendiente" });
     }
    },
    asentar() {
      this.$router.push({
        path: "/actividad/add",
        query: { idpendiente: this.$route.params.id },
      });
    },
  },
};
</script>
