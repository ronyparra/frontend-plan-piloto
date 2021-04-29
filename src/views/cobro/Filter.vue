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
            <AutocompleteUsuario
              label=""
              clearable
              placeholder="Cobrado por"
              :rules="[]"
              v-model="form.idusuario"
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
          <c-btn text color="blue" class="mt-n1 text-capitalize" @click="filtrar()"
            >Filtrar</c-btn
          >
        </c-row>
      </c-form>
      <c-divider></c-divider>
    </c-card-text>
  </c-card>
</template>
<script>
import TextDate from "@/components/TextDate";
import AutocompleteCliente from "../cliente/Autocomplete";
import AutocompleteEstadoCobro from "../estadocobro/Autocomplete";
import AutocompleteUsuario from "../usuario/Autocomplete";
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    value: Array,
  },
  components: {
    TextDate,
    AutocompleteUsuario,
    AutocompleteCliente,
    AutocompleteEstadoCobro
  },
  created() {
    this.form = JSON.parse(JSON.stringify(this.getParams));
  },
  watch:{
    getParams(){
      this.form = JSON.parse(JSON.stringify(this.getParams));
    }
  },
  computed:{
    ...mapGetters("cobro",['getParams'])
  },
  methods: {
    ...mapActions("cobro", ["fetchCobro","setParams"]),
    
    filtrar() {
      if (!this.$refs.form.validate()) return null;
      this.fetchCobro(this.form);
      this.setParams(this.form);
    },
  },
  data: () => ({
    form: {
      idcliente: "",
      idusuario: "",
      idsucursal: "",
      fechadesde: "",
      fechahasta: "",
      idestadocobro: "",
    },
  }),
};
</script>
