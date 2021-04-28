<template>
  <c-card flat class="mb-n2">
    <c-card-text>
      <c-form ref="form">
        <c-row dense>
          <c-col cols="12" sm="4" md="2" class="my-n2">
            <AutocompleteCliente
              label=""
              clearable
              placeholder="Cliente"
              :rules="[]"
              @change="form.idsucursal = undefined"
              v-model="form.idcliente"
            />
          </c-col>
          <c-col cols="12" sm="4" md="2" class="my-n2">
            <AutocompleteClienteSucursal
              label=""
              placeholder="Sucursal"
              :rules="[]"
              clearable
             
              :idcliente="form.idcliente"
              v-model="form.idsucursal"
            />
          </c-col>
          <c-col cols="12" sm="4" md="2" class="my-n2">
            <AutocompleteEstadoCobro
              label=""
              clearable
              placeholder="Estado de Cobro"
              :rules="[]"
              v-model="form.idestadocobro"
            />
          </c-col>
          <c-col cols="12" sm="4" md="2" class="my-n2">
            <TextDate
              placeholder="Filtrar Desde"
              v-model="form.fechadesde"
            />
          </c-col>
          <c-col cols="9" sm="4" md="2" class="my-n2">
            <TextDate
              placeholder="Filtrar Hasta"
              v-model="form.fechahasta"
            />
          </c-col>

          <v-spacer></v-spacer>
          <c-btn text color="blue" class="mt-n3 text-capitalize" @click="filtrar()"
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
import { mapActions, mapGetters } from "vuex";
import Opciones from "./Opciones";
export default {
  props: {
    value: Array
  },
  components: {
    Opciones,
    TextDate,
    AutocompleteCliente,
    AutocompleteEstadoCobro,
    AutocompleteClienteSucursal,
  },
  created() {
    this.form = JSON.parse(JSON.stringify(this.getParams));
  },
  computed:{
    ...mapGetters("actividad", ["getParams"])
  },
  methods: {
    ...mapActions("actividad", ["fetchActividad","setParams"]),
    
    filtrar() {
      if (!this.$refs.form.validate()) return null;
      this.fetchActividad(this.form);
      this.setParams(this.form);
    },
  },
  data: () => ({
    form: {
      idcliente: "",
      idsucursal: "",
      fechadesde: "",
      fechahasta: "",
      idestadocobro: 1,
    },
  }),
};
</script>
