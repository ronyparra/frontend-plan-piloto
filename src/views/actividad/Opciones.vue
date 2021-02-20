<template>
  <c-card flat class="mb-n2">
    <c-card-text>
      <c-form ref="form">
        <c-row dense>
          <c-col cols="12" sm="5">
            <AutocompleteEstadoCobro
              :rules="rules"
              :dense="false"
              :filled="false"
              v-model="form.idestadocobro"
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
import { mapActions } from "vuex";
import AutocompleteEstadoCobro from "../estadocobro/Autocomplete";
export default {
  computed: {
    rules() {
      return [
        () => this.value.length > 0 || "Seleccione una o mas actividades",
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
    ...mapActions("actividad", ["setChangeStatus"]),
    async cambiarEstado() {
      this.form.detalle = JSON.parse(JSON.stringify(this.value));
      const response = await this.setChangeStatus(this.form);
      if (response.success) {
        this.$emit("fetch");
        this.form.idestadocobro = null;
        this.$refs.form.resetValidation();
      }
    },

  },
  data: () => ({
    form: {
      idestadocobro: null,
      detalle: [],
    },
  }),
};
</script>
