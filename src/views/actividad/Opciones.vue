<template>
  <c-card flat>
    <c-card-text>
      <c-form ref="form">
        <c-row dense>
          <c-col cols="12" sm="5">
            <AutocompleteEstadoCobro
              :rules="rules"
              :dense="false"
              :filled="false"
            />
          </c-col>
          <c-btn
            class="mt-sm-6 mt-0"
            rounded
            small
            text
            color="blue"
            @click="cambiarEstado()"
            >Cambiar Estado</c-btn
          >
          <v-spacer></v-spacer>
          <c-btn class="mt-sm-6 mt-0" rounded small text color="red"
            >Generar PDF</c-btn
          >
        </c-row>
      </c-form>
    </c-card-text></c-card
  >
</template>
<script>
import AutocompleteEstadoCobro from "../estadocobro/Autocomplete";
export default {
  computed: {
    rules() {
      return [
        () => this.value.length > 0 || "Seleccione la/s activadad/es",
        (v) => !!v || "Obligatorio",
      ];
    },
  },
  props: {
    value: Array,
  },
  components: {
    AutocompleteEstadoCobro,
  },
  methods: {
    cambiarEstado() {
      
    },
  },
};
</script>
