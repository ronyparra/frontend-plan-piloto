<template>
  <c-card flat>
    <c-card-text>
      <c-form ref="form">
        <c-row dense>
          <c-col cols="12" sm="3" class="my-n3">
            <AutocompleteCliente
              label=""
              clearable
              placeholder="Cliente"
              :dense="false"
              :rules="[]"
              :filled="false"
              v-model="form.idcliente"
            />
          </c-col>
          <c-col cols="12" sm="3" class="my-n3">
            <TextDate
              :dense="false"
              :filled="false"
              placeholder="Filtrar Desde"
              v-model="form.fechadesde"
            />
          </c-col>
          <c-col cols="12" sm="3" class="my-n3">
            <TextDate
              :dense="false"
              :filled="false"
              placeholder="Filtrar Hasta"
              v-model="form.fechahasta"
            />
          </c-col>
          <c-col cols="9" sm="2" class="my-n3">
            <AutocompleteEstadoCobro
              label=""
              clearable
              placeholder="Estado de Cobro"
              :rules="[]"
              :dense="false"
              :filled="false"
              v-model="form.idestadocobro"
            />
          </c-col>
          <v-spacer></v-spacer>
          <c-btn text color="blue" class="mt-2 text-capitalize" @click="filtrar"
            >Filtrar</c-btn
          >
        </c-row>
      </c-form>
    </c-card-text>
  </c-card>
</template>
<script>
import TextDate from "@/components/TextDate";
import AutocompleteCliente from "../cliente/Autocomplete";
import AutocompleteEstadoCobro from "../estadocobro/Autocomplete";
import { mapActions } from "vuex";
export default {
  props: {
    params: [Object],
  },
  components: {
    TextDate,
    AutocompleteCliente,
    AutocompleteEstadoCobro,
  },
  created() {
    this.form = JSON.parse(JSON.stringify(this.params));
  },
  methods: {
    ...mapActions("actividad", ["fetchActividad"]),
    filtrar() {
      if (!this.$refs.form.validate()) return null;
      this.fetchActividad(this.form);
    },
  },
  data: () => ({
    form: {
      idcliente: "",
      fechadesde: "",
      fechahasta: "",
      idestadocobro: "",
    },
  }),
};
</script>
