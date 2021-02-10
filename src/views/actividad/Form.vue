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
              <TextDate label="Fecha" v-model="form.fecha" />
            </c-col>
            <c-col cols="12">
              <AutocompleteCliente v-model="form.idcliente.idcliente" />
            </c-col>
            <c-col cols="12">
              <AutocompleteTecnico
                multiple
                label="Tecnicos"
                v-model="form.tecnico"
                return-object
              />
            </c-col>
          </c-row>
        </c-form>
        <c-divider class="mb-3"></c-divider>
        <c-form ref="formDetail">
          <c-row dense>
            <c-col cols="12">
              <AutocompleteConcepto
                v-model="detalle.idconcepto"
                return-object
                @change="detalle.precio = detalle.idconcepto.precio"
              />
            </c-col>
            <c-col cols="5">
              <TextNumber label="Cantidad" v-model="detalle.cantidad" />
            </c-col>
            <c-col cols="5">
              <TextNumber label="Precio" v-model="detalle.precio" />
            </c-col>

            <c-spacer></c-spacer>
            <BtnAdd :x-small="false" class="mt-2 mr-1" @click="addDetalle()" />
          </c-row>
        </c-form>
        <v-data-table
          dense
          :headers="headers"
          :items="form.detalle"
          :mobile-breakpoint="0"
          :items-per-page="99999"
          hide-default-footer
        >
          <template v-slot:[`item.actions`]="{ item }">
            <BtnDelete class="my-1" @click="deletDetalle(item)" />
          </template>
        </v-data-table>
      </c-container>
      <c-container>
        <c-row dense>
          <c-col cols="12">
            <TextField
              ref="cliente3"
              :rules="[]"
              label="Solicitante del servicio"
              v-model="form.solicitante"
            />
          </c-col>
          <c-col cols="12">
            <TextField
              ref="cliente3"
              :rules="[]"
              label="Comentario"
              v-model="form.comentario"
            />
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
import { mapActions, mapGetters } from "vuex";
import { current_date } from "@/util/date.util";

import BtnClose from "@/components/BtnClose";
import BtnAdd from "@/components/BtnAdd";
import BtnDelete from "@/components/BtnDelete";
import LoadingCircular from "@/components/LoadingCircular";
import TextField from "@/components/TextField";
import TextNumber from "@/components/TextNumber";
import TextDate from "@/components/TextDate";
import AutocompleteCliente from "../cliente/Autocomplete";
import AutocompleteTecnico from "../usuario/Autocomplete";
import AutocompleteConcepto from "../concepto/Autocomplete";


export default {
  components: {
    BtnAdd,
    BtnClose,
    BtnDelete,
    TextField,
    TextNumber,
    TextDate,
    LoadingCircular,
    AutocompleteCliente,
    AutocompleteTecnico,
    AutocompleteConcepto,
  },
  data: () => ({
    form: {
      fecha: current_date(),
      idcliente: {
        idcliente: null,
      },
      idusuario: {
        idusuario: null,
      },
      solicitante: "",
      comentario: "",
      tecnico: [],
      detalle: [],
    },
    default: {
      fecha: current_date(),
      idcliente: {
        idcliente: null,
      },
      idusuario: {
        idusuario: null,
      },
      solicitante: "",
      comentario: "",
      tecnico: [],
      detalle: [],
    },
    detalle: {
      idconcepto: {
        idconcepto: "",
      },
      precio: '',
      cantidad: '',
    },
    detalle_default: {
      idconcepto: {
        idconcepto: "",
      },
      precio: '',
      cantidad: '',
    },
    headers: [
      {
        text: "Concepto",
        align: "start",
        value: "idconcepto.descripcion",
      },
      {
        text: "Cantidad",
        align: "start",
        value: "cantidad",
      },
      {
        text: "Precio",
        align: "start",
        value: "precio",
      },
      {
        text: "#",
        align: "end",
        value: "actions",
      },
    ],
  }),
  computed: {
    ...mapGetters("actividad", ["isLoading"]),
    ...mapGetters("auth",["getUserInfo"])
  },
  methods: {
    ...mapActions("actividad", ["createActividad", "fetchActividad"]),

    addDetalle() {
      if (!this.$refs.formDetail.validate()) return null;
      this.form.detalle.push(this.detalle);
      this.detalle = JSON.parse(JSON.stringify(this.detalle_default));
      this.$refs.formDetail.resetValidation();
    },
    async guardar() {
      if (!this.$refs.form.validate()) return null;
      this.form.idusuario.idusuario = this.getUserInfo.idusuario;
      const response = await this.createActividad(this.form);
      if (response.success) {
        this.form = JSON.parse(JSON.stringify(this.default));
        this.$refs.form.resetValidation();
        this.fetchActividad();
      }
    },

    deletDetalle(detalle) {
      const index = this.form.detalle.indexOf(detalle);
      this.form.detalle.splice(index, 1);
    },
  },
};
</script>
