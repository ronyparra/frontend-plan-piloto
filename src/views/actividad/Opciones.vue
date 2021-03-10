<template>
  <c-form ref="form">
    <c-row dense>
      <c-btn
        class="mt-sm-6 mt-2"
        rounded
        small
        dark
        :disabled="value.length === 0"
        :color="value.length === 0 ? 'grey' : 'red darken-1'"
        @click="facturar()"
        >{{ textButtom }}</c-btn
      >
      <v-spacer></v-spacer>
      <c-btn
        class="mt-sm-6 mt-2"
        rounded
        elevation="0"
        small
        text
        color="red darken-1"
        @click="$emit('pdf')"
        >Generar PDF</c-btn
      >
    </c-row>
    <c-dialog v-model="confirm.dialog" max-width="800" persistent>
      <c-card>
        <c-toolbar flat dense>
          <c-toolbar-title>Desea facturar estas actividades?</c-toolbar-title>
        </c-toolbar>
        <v-alert type="error" v-if="!uniqueClien" dense class="ma-1"
          >Hay mas de un cliente en seleccionado</v-alert
        >
        <v-data-table
          :headers="headers"
          :items="value"
          show-select
          :items-per-page="9999999"
          v-model="form.detalle"
          item-key="idactividad"
          hide-default-footer
        >
          <template v-slot:[`item.detalle`]="{ item }">
            <div>{{ formatDetalle(item.detalle) }}</div>
          </template>
          <template v-slot:[`item.subtotal`]="{ item }">
            <div>{{ formatSubTotal(item.detalle) }}</div>
          </template>

          <template slot="body.append">
            <tr>
              <th class="subtitle-2 font-weight-black hidden-xs-only">TOTAL</th>
              <th class="hidden-xs-only"></th>
              <th class="hidden-xs-only"></th>
              <th class="hidden-xs-only"></th>
              <th class="subtitle-1 text-end font-weight-black">
                {{ total }}
              </th>
            </tr>
          </template>
        </v-data-table>

        <c-card-actions>
          <c-btn rounded text small color="grey" @click="confirm.dialog = false"
            >CANCELAR</c-btn
          >
          <c-spacer></c-spacer>
          <c-btn
            rounded
            small
            elevation="0"
            :color="disabledSaveButton ? 'grey' : 'red darken-1'"
            dark
            :disabled="disabledSaveButton"
            @click="cambiarEstado()"
            >Si, quiero facturar</c-btn
          >
        </c-card-actions>
      </c-card>
    </c-dialog>
  </c-form>
</template>
<script>
import { mapActions } from "vuex";
import { formatDetalle } from "./formatter";
import { currencyFormatter } from "@/util/number.util";
export default {
  computed: {
    rules() {
      return [
        () => this.value.length > 0 || "Seleccione una o mas actividades",
        (v) => !!v || "Obligatorio",
      ];
    },
    total: (vm) => {
      const total = vm.form.detalle.reduce((acc, curr) => {
        const subtotal = curr.detalle.reduce(
          (acc1, curr1) => (acc1 = curr1.cantidad * curr1.precio),
          0
        );
        return (acc = acc + subtotal);
      }, 0);
      return currencyFormatter(total);
    },
    uniqueClien: (vm) => {
      if (vm.form.detalle.length === 0) return true;
      const first = vm.form.detalle[0].idcliente.idcliente;
      const unique = vm.form.detalle.find(
        ({ idcliente }) => idcliente.idcliente !== first
      )
        ? false
        : true;
      return unique;
    },
    disabledSaveButton: (vm) =>
      !vm.uniqueClien || vm.form.detalle.length === 0 ? true : false,
    textButtom: (vm) =>
      vm.value.length === 0
        ? "Seleccione una o mas actividades"
        : "Facturar " +
          vm.value.length +
          (vm.value.length === 1 ? " Actividad" : " Actividades"),
  },
  props: {
    value: Array,
  },
  methods: {
    ...mapActions("actividad", ["setChangeStatus"]),
    async cambiarEstado() {
      this.form.idestadocobro = 2;
      const response = await this.setChangeStatus(this.form);
      if (response.success) {
        this.$emit("fetch");
        this.form.idestadocobro = null;
        this.confirm.dialog = false;
        this.$refs.form.resetValidation();
      }
    },
    facturar() {
      this.form.detalle = JSON.parse(JSON.stringify(this.value));
      this.confirm.dialog = true;
    },
    formatDetalle(detalle) {
      return formatDetalle(detalle);
    },
    formatSubTotal(detalle) {
      return currencyFormatter(
        detalle.reduce(
          (acc, curr) => (acc = acc + curr.cantidad * curr.precio),
          0
        )
      );
    },
  },
  data: () => ({
    confirm: {
      dialog: false,
    },
    form: {
      idestadocobro: null,
      detalle: [],
    },
    headers: [
      { text: "Cliente", value: "idcliente.razonsocial", sortable: false },
      {
        text: "Sucursal",
        value: "idcliente_sucursal.descripcion",
        sortable: false,
      },
      { text: "Conceptos", value: "detalle", sortable: false },
      { text: "SubTotal", value: "subtotal", align: "end", sortable: false },
    ],
  }),
};
</script>
