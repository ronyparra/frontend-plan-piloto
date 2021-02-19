<template>
  <div class="fill-height">
    <c-app-bar app flat color="secondary">
      <BtnClose to="/actividad" />
      <c-toolbar-title class="flex text-center title">
        {{ $route.name }}
      </c-toolbar-title>
      <BtnDelete :text="false" v-if="isEdit" @click="deleteView = true" />
    </c-app-bar>
    <Delete
      v-model="deleteView"
      vuex-action="actividad/deleteActividad"
      :id-to-delete="$route.params.id"
      @success="$router.push({ path: '/actividad' })"
    />
    <c-card class="fill-height d-flex flex-column justify-space-between">
      <c-card-text>
        <c-form ref="form">
          <c-row dense>
            <c-col cols="12" sm="6">
              <TextDate label="Fecha" v-model="form.fecha" />
            </c-col>
            <c-col cols="12" sm="6">
              <AutocompleteCliente
                :redirect="$route.path"
                v-model="form.idcliente"
                return-object
              />
            </c-col>
            <c-col cols="12" v-if="sucursal.length > 1">
              <AutocompleteClienteSucursal
                :items="sucursal"
                v-model="form.idcliente_sucursal.idcliente_sucursal"
              />
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
            <c-col cols="12" sm="5">
              <AutocompleteConcepto
                v-model="detalle.idconcepto"
                :redirect="$route.path"
                return-object
                @change="detalle.precio = detalle.idconcepto.precio"
              />
            </c-col>
            <c-col cols="5" sm="3">
              <TextNumber label="Cantidad" v-model="detalle.cantidad" />
            </c-col>
            <c-col cols="5" sm="3">
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
      </c-card-text>
      <c-card-text>
        <c-row dense>
          <c-col cols="12" sm="6">
            <TextField
              ref="cliente3"
              :rules="[]"
              label="Solicitante del servicio"
              v-model="form.solicitante"
            />
          </c-col>
          <c-col cols="12" sm="6">
            <TextField
              ref="cliente3"
              :rules="[]"
              label="Comentario"
              v-model="form.comentario"
            />
          </c-col>
        </c-row>
      </c-card-text>
      <c-container>
        <c-btn block dark color="primary" rounded @click="guardar()">
          {{ isEdit ? "Modificar" : "Registrar" }}</c-btn
        >
      </c-container>
    </c-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { current_date } from "@/util/date.util";

import BtnClose from "@/components/BtnClose";
import BtnAdd from "@/components/BtnAdd";
import BtnDelete from "@/components/BtnDelete";

import TextField from "@/components/TextField";
import TextNumber from "@/components/TextNumber";
import TextDate from "@/components/TextDate";
import Delete from "../delete/Delete";
import AutocompleteCliente from "../cliente/Autocomplete";
import AutocompleteTecnico from "../usuario/Autocomplete";
import AutocompleteConcepto from "../concepto/Autocomplete";
import AutocompleteClienteSucursal from "../cliente/AutocompleteSucursal";

export default {
  components: {
    BtnAdd,
    BtnClose,
    BtnDelete,
    TextField,
    TextNumber,
    TextDate,
    Delete,
    AutocompleteCliente,
    AutocompleteTecnico,
    AutocompleteConcepto,
    AutocompleteClienteSucursal,
  },
  data: () => ({
    isEdit: false,
    deleteView: false,
    form: {
      fecha: current_date(),
      idcliente: {
        idcliente: null,
        sucursal: [],
      },
      idcliente_sucursal: {
        idcliente_sucursal: null,
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
        sucursal: [],
      },
      idcliente_sucursal: {
        idcliente_sucursal: null,
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
      precio: "",
      cantidad: "",
    },
    detalle_default: {
      idconcepto: {
        idconcepto: "",
      },
      precio: "",
      cantidad: "",
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
  mounted() {
    if (this.$route.params.id) this.editHandler();
  },
  computed: {
    ...mapGetters("actividad", ["isLoading", "getActividadId"]),
    ...mapGetters("cliente", ["getCliente"]),
    ...mapGetters("auth", ["getUserInfo"]),
    sucursal: (vm) => {
      let suc = vm.getCliente
        .filter((cliente) => cliente.idcliente === vm.form.idcliente.idcliente)
        .reduce((acc, curr) => {
          return (acc = curr.sucursal);
        }, []);
      return suc;
    },
  },
  methods: {
    ...mapActions("actividad", [
      "createActividad",
      "updateActividad",
      "fetchActividad",
      "fetchActividadId",
    ]),

    async editHandler() {
      this.isEdit = true;
      if (this.getActividadId)
        return (this.form = JSON.parse(JSON.stringify(this.getActividadId)));
      await this.fetchActividadId({ id: this.$route.params.id });
      this.form = JSON.parse(JSON.stringify(this.getActividadId));
    },
    addDetalle() {
      if (!this.$refs.formDetail.validate()) return null;
      this.form.detalle.push(this.detalle);
      this.detalle = JSON.parse(JSON.stringify(this.detalle_default));
      this.$refs.formDetail.resetValidation();
    },
    async guardar() {
      if (!this.$refs.form.validate()) return null;
      this.form.idusuario.idusuario = this.getUserInfo.idusuario;
      if (this.sucursal.length === 1)
        this.form.idcliente_sucursal.idcliente_sucursal = this.sucursal[0].idcliente_sucursal;
      const response = this.isEdit
        ? await this.updateActividad({
            id: this.$route.params.id,
            form: this.form,
          })
        : await this.createActividad(this.form);
      if (response.success && !this.isEdit) {
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
