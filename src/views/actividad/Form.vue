<template>
  <div class="fill-height">
    <c-app-bar app flat color="secondary">
      <BtnClose to="/actividad" />
      <c-toolbar-title class="flex text-center title">
        {{ $route.name }}
      </c-toolbar-title>
    </c-app-bar>

    <c-card class="fill-height d-flex flex-column justify-space-between">
      <c-container>
        <c-form ref="form">
          <c-row dense>
            <c-col cols="12">
              <TextDate label="Fecha" />
            </c-col>
            <c-col cols="12">
              <AutocompleteCliente />
            </c-col>
          </c-row>
        </c-form>
        <c-form ref="formDetail">
          <c-row dense>
            <c-col cols="12">
              <AutocompleteTecnico multiple label="Tecnico" />
            </c-col>
      
          </c-row>
          <c-divider class="mb-3"></c-divider>
          <c-row dense>
            <c-col cols="12">
              <AutocompleteConcepto />
            </c-col>
            <c-col cols="5">
              <TextField ref="cliente3" label="Cantidad" v-model="sucursal" />
            </c-col>
            <c-col cols="5">
              <TextField ref="cliente3" label="Precio" v-model="sucursal" />
            </c-col>

            <c-spacer></c-spacer>
            <BtnAdd :x-small="false" class="mt-2 mr-1" @click="addSucursal()" />
          </c-row>
        </c-form>
        <v-data-table
          dense
          :headers="headers"
          :items="form.sucursal"
          :mobile-breakpoint="0"
          :items-per-page="99999"
          hide-default-footer
        >
          <template v-slot:[`item.actions`]="{ item }">
            <BtnDelete class="my-1" @click="deletSucursal(item)" />
          </template>
        </v-data-table>
      </c-container>
      <c-container>
        <c-row dense>
        <c-col cols="12">
              <TextField ref="cliente3" label="Solicitante del servicio" v-model="sucursal" />
            </c-col>
              <c-col cols="12">
              <TextField ref="cliente3" label="Comentario" v-model="sucursal" />
            </c-col>
            </c-row>
      </c-container>
      <c-container>
        <c-btn block dark color="primary" rounded @click="guardar()">
          Registrar</c-btn
        >
      </c-container>
    </c-card>
    <LoadingCircular :value="isLoading" />
  </div>
</template>
<script>
import BtnClose from "@/components/BtnClose";
import BtnAdd from "@/components/BtnAdd";
import BtnDelete from "@/components/BtnDelete";
import LoadingCircular from "@/components/LoadingCircular";
import TextField from "@/components/TextField";
import TextDate from "@/components/TextDate";
import AutocompleteCliente from "../cliente/Autocomplete";
import AutocompleteTecnico from "../usuario/Autocomplete";
import AutocompleteConcepto from "../concepto/Autocomplete";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    BtnAdd,
    BtnClose,
    BtnDelete,
    TextField,
    TextDate,
    LoadingCircular,
    AutocompleteCliente,
    AutocompleteTecnico,
    AutocompleteConcepto,
  },
  data: () => ({
    sucursal: "",
    form: {
      razonsocial: "",
      ruc: "",
      sucursal: [],
    },
    default: {
      razonsocial: "",
      ruc: "",
      sucursal: [],
    },
    headers: [
      {
        text: "Sucursal",
        align: "start",
        value: "descripcion",
      },

      {
        text: "#",
        align: "end",
        value: "actions",
      },
    ],
  }),
  computed: {
    ...mapGetters("cliente", ["isLoading"]),
  },
  methods: {
    ...mapActions("cliente", ["createCliente", "fetchCliente"]),
    addSucursal() {
      if (!this.$refs.formDetail.validate()) return null;
      this.form.sucursal.push({
        descripcion: this.sucursal,
        latitud: null,
        longitud: null,
      });
      this.sucursal = "";
      this.$refs.formDetail.resetValidation();
    },
    async guardar() {
      if (!this.$refs.form.validate()) return null;
      const response = await this.createCliente(this.form);
      if (response.success) {
        this.form = JSON.parse(JSON.stringify(this.default));
        this.$refs.form.resetValidation();
        this.fetchCliente();
      }
    },

    deletSucursal(sucursal) {
      const index = this.form.sucursal.indexOf(sucursal);
      this.form.sucursal.splice(index, 1);
    },
  },
};
</script>
