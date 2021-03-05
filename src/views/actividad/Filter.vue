<template>
  <c-card flat class="mb-n2">
    <c-card-text>
      <c-form ref="form">
        <c-row dense>
          <c-col cols="12" sm="4" md="2" class="my-n3">
            <AutocompleteCliente
              label=""
              clearable
              placeholder="Cliente"
              :dense="false"
              :rules="[]"
              :filled="false"
              @change="form.idsucursal = undefined"
              v-model="form.idcliente"
            />
          </c-col>
          <c-col cols="12" sm="4" md="2" class="my-n3">
            <AutocompleteClienteSucursal
              label=""
              placeholder="Sucursal"
              :rules="[]"
              clearable
              :dense="false"
              :filled="false"
              :idcliente="form.idcliente"
              v-model="form.idsucursal"
            />
          </c-col>
          <c-col cols="12" sm="4" md="2" class="my-n3">
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
          <c-col cols="12" sm="4" md="2" class="my-n3">
            <TextDate
              :dense="false"
              :filled="false"
              placeholder="Filtrar Desde"
              v-model="form.fechadesde"
            />
          </c-col>
          <c-col cols="9" sm="4" md="2" class="my-n3">
            <TextDate
              :dense="false"
              :filled="false"
              placeholder="Filtrar Hasta"
              v-model="form.fechahasta"
            />
          </c-col>

          <v-spacer></v-spacer>
          <c-btn text color="blue" class="mt-2 text-capitalize" @click="filtrar()"
            >Filtrar</c-btn
          >
        </c-row>
      </c-form>
      <c-divider></c-divider>
      <Opciones :value="value" @fetch="$emit('fetch')" @pdf="$emit('pdf')" />
    </c-card-text>
  </c-card>
</template>
<script>
import TextDate from "@/components/TextDate";
import AutocompleteCliente from "../cliente/Autocomplete";
import AutocompleteEstadoCobro from "../estadocobro/Autocomplete";
import AutocompleteClienteSucursal from "../cliente/AutocompleteSucursal";
import { mapActions } from "vuex";
import Opciones from "./Opciones";
export default {
  props: {
    value: Array,
    params: [Object],
  },
  components: {
    Opciones,
    TextDate,
    AutocompleteCliente,
    AutocompleteEstadoCobro,
    AutocompleteClienteSucursal,
  },
  created() {
    this.form = JSON.parse(JSON.stringify(this.params));
  },
  methods: {
    ...mapActions("actividad", ["fetchActividad"]),
    
    filtrar() {
      if (!this.$refs.form.validate()) return null;
      this.fetchActividad(this.form);
      this.$emit('sync', this.form);
    },
  },
  data: () => ({
    form: {
      idcliente: "",
      idsucursal: "",
      fechadesde: "",
      fechahasta: "",
      idestadocobro: "",
    },
  }),
};
</script>
