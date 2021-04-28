<template>
  <div class="fill-height">
    <HeaderForm>
      
      <c-toolbar-title class="flex text-center title">
        {{ $route.name }}
      </c-toolbar-title>
      <BtnDelete
        :disabled="readonly"
        :text="false"
        v-if="isEdit"
        class="mr-1"
        @click="deleteView = true"
      />
      <BtnClose to="/actividad" />
    </HeaderForm>
    <Delete
      v-model="deleteView"
      vuex-action="actividad/deleteActividad"
      :id-to-delete="$route.params.id"
      @success="$router.push({ path: '/actividad' })"
    />
    <Confirmation v-model="confirm.delete" @confirm="deletDetalle(confirm.item)"
      >Desea eliminar este detalle?</Confirmation
    >
    <c-card class="fill-height d-flex flex-column justify-space-between">
      <c-container>
        <c-form ref="form">
          <c-row dense>
            <c-col cols="12" sm="3">
              <TextDate
                :readonly="readonly"
                label="Fecha"
                v-model="form.fecha"
              />
            </c-col>
            <c-col cols="12" sm="3">
              <AutocompleteCliente
                :readonly="readonly"
                :redirect="$route.path"
                v-model="form.idcliente"
                return-object
                ref="act1"
              />
            </c-col>
            <c-col cols="12" sm="3" v-if="sucursal.length > 1">
              <AutocompleteClienteSucursal
                :readonly="readonly"
                ref="act2"
                :idcliente="form.idcliente.idcliente"
                v-model="form.idcliente_sucursal.idcliente_sucursal"
              />
            </c-col>
            <c-col cols="12" sm="3">
              <AutocompleteTecnico
                :readonly="readonly"
                ref="act3"
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
            <c-col cols="7" sm="3">
              <AutocompleteConcepto
                :readonly="readonly"
                v-model="detalle.idconcepto"
                :redirect="$route.path"
                ref="act4"
                return-object
                @change="asignarDetalle(detalle.idconcepto)"
              />
            </c-col>
            <c-col cols="5" sm="3">
              <AutocompleteMoneda v-model="detalle.idmoneda" return-object />
            </c-col>
            <c-col cols="5" sm="2">
              <TextNumber
                :readonly="readonly"
                ref="act5"
                label="Cantidad"
                v-model="detalle.cantidad"
              />
            </c-col>
            <c-col cols="5" sm="2">
              <TextNumber
                :readonly="readonly"
                ref="act6"
                label="Precio"
                v-model="detalle.precio"
              />
            </c-col>

            <c-spacer></c-spacer>
            <BtnAdd
              ref="act7"
              :disabled="readonly"
              :x-small="false"
              class="mt-2 mr-1"
              @click="addDetalle()"
            />
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
          <template v-slot:[`item.precio`]="{ item }">
            <div>{{ toCurrency(item.precio) }}</div>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <BtnDelete
              class="ma-1"
              :disabled="readonly"
              @click="showConfirmationDelete(item)"
            />
            <BtnIcon
              :disabled="readonly"
              class="ma-1"
              @click="editDetalle(item)"
              >edit</BtnIcon
            >
          </template>
        </v-data-table>
      </c-container>
      <c-container>
        <c-row dense>
          <c-col cols="12" sm="6">
            <TextField
              :readonly="readonly"
              ref="cliente3"
              :rules="[]"
              label="Solicitante del servicio"
              v-model="form.solicitante"
            />
          </c-col>
          <c-col cols="12" sm="6">
            <TextArea
              :readonly="readonly"
              ref="cliente3"
              :rules="[]"
              label="Comentario"
              v-model="form.comentario"
            />
          </c-col>
        </c-row>
      </c-container>
      <c-container>
        <c-btn
          :disabled="readonly"
          block
          dark
          color="primary"
          rounded
          @click="guardar()"
        >
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
import BtnIcon from "@/components/BtnIcon";
import Confirmation from "@/components/Confirmation";

import TextField from "@/components/TextField";
import TextNumber from "@/components/TextNumber";
import TextDate from "@/components/TextDate";
import TextArea from "@/components/TextArea";
import Delete from "../delete/Delete";
import { currencyFormatter } from "@/util/number.util";
import AutocompleteMoneda from "../moneda/Autocomplete";
import AutocompleteCliente from "../cliente/Autocomplete";
import AutocompleteTecnico from "../usuario/Autocomplete";
import AutocompleteConcepto from "../concepto/Autocomplete";
import AutocompleteClienteSucursal from "../cliente/AutocompleteSucursal";
import HeaderForm from "../../components/HeaderForm";
export default {
  components: {
    HeaderForm,
    BtnIcon,
    BtnAdd,
    BtnClose,
    BtnDelete,
    Confirmation,
    TextField,
    TextArea,
    TextNumber,
    TextDate,
    Delete,
    AutocompleteMoneda,
    AutocompleteCliente,
    AutocompleteTecnico,
    AutocompleteConcepto,
    AutocompleteClienteSucursal,
  },
  data: () => ({
    isEdit: false,
    deleteView: false,
    confirm: {
      delete: false,
      item: null,
    },
    form: {
      fecha: current_date(),
      idestadocobro: {
        idestadocobro: 1,
      },
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
      actividad_pendiente: [],
    },
    default: {
      fecha: current_date(),
      idestadocobro: {
        idestadocobro: 1,
      },
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
      actividad_pendiente: [],
    },
    detalle: {
      idconcepto: {
        idconcepto: "",
      },
      idmoneda: {
        idmoneda: null,
      },
      precio: "",
      cantidad: "",
    },
    detalle_default: {
      idconcepto: {
        idconcepto: "",
      },
      idmoneda: {
        idmoneda: null,
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
        value: "cantidad",
        align: "end",
      },
      {
        text: "Precio",
        align: "end",
        value: "precio",
      },
      {
        text: "Moneda",
        align: "end",
        value: "idmoneda.abreviatura",
      },
      {
        align: "end",
        value: "actions",
      },
    ],
  }),
  mounted() {
    if (this.$route.params.id) this.editHandler();
    if (this.$route.query.idpendiente) this.pendienteHanler();
  },
  computed: {
    ...mapGetters("actividad", ["isLoading", "getActividadId"]),
    ...mapGetters("pendiente", ["getPendienteId"]),
    ...mapGetters("cliente", ["getCliente"]),
    ...mapGetters("auth", ["getUserInfo"]),
    readonly: (vm) =>
      vm.form.idestadocobro.idestadocobro === 1 ? false : true,
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
      "fetchActividadId",
    ]),
    ...mapActions("pendiente", ["fetchPendienteId", "fetchPendiente"]),
    toCurrency(value) {
      return currencyFormatter(value);
    },
    asignarDetalle(concepto) {
      this.detalle.precio = concepto.precio;
      this.detalle.idmoneda = JSON.parse(JSON.stringify(concepto.idmoneda));
    },
    async editHandler() {
      this.isEdit = true;
      if (this.getActividadId)
        return (this.form = JSON.parse(JSON.stringify(this.getActividadId)));
      await this.fetchActividadId({ id: this.$route.params.id });
      this.form = JSON.parse(JSON.stringify(this.getActividadId));
    },
    async pendienteHanler() {
      this.form.actividad_pendiente[0] = Number(this.$route.query.idpendiente);
      if (this.getPendienteId)
        return (this.form.comentario = this.getPendienteId.descripcion);
      await this.fetchPendienteId({ id: this.$route.query.idpendiente });
      return (this.form.comentario = this.getPendienteId.descripcion);
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
      if (response.success) {
        if (this.isEdit) this.$router.replace({ path: "/actividad" });
        if (this.$route.query.idpendiente) {
          this.$router.replace("/pendiente");
        }
        this.form = JSON.parse(JSON.stringify(this.default));
        this.$refs.form.resetValidation();
      }
    },
    editDetalle(detalle) {
      this.detalle = JSON.parse(JSON.stringify(detalle));
      this.deletDetalle(detalle);
    },
    showConfirmationDelete(detalle) {
      this.confirm.item = null;
      this.confirm.delete = true;
      this.confirm.item = null;
      this.confirm.item = detalle;
    },
    deletDetalle(detalle) {
      const index = this.form.detalle.indexOf(detalle);
      this.form.detalle.splice(index, 1);
      this.confirm.delete = false;
      this.confirm.item = null;
    },
  },
};
</script>
