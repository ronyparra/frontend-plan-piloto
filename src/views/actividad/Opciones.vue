<template>
  <v-form ref="form">
    <v-row dense class="mt-sm-4 mt-2 mb-2">
      <v-btn
        rounded
        small
        dark
        :disabled="value.length === 0"
        :color="value.length === 0 ? 'grey' : 'red darken-1'"
        @click="facturar()"
        >{{ textButtom }}</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn
        rounded
        elevation="0"
        small
        text
        color="red darken-1"
        @click="$emit('pdf')"
        >Generar PDF</v-btn
      >
    </v-row>
    <c-dialog v-model="confirm.dialog" max-width="800" persistent>
      <c-card>
        <v-toolbar flat dense>
          <v-toolbar-title>Desea facturar estas actividades?</v-toolbar-title>
        </v-toolbar>
        <v-alert type="error" v-if="!uniqueClien" dense class="ma-1"
          >Hay mas de un cliente en seleccionado</v-alert
        >
        <v-alert type="info" v-if="!uniqueMoney" dense class="ma-1"
          ><span class="caption"
            >Se encontro mas de una moneda entre las actividades</span
          >
          <br />
          Si decide continuar se va a generar <strong>DOS</strong> facturas
          (<strong>UNO</strong> para cada moneda)
        </v-alert>
        <TextField
          placeholder="Descripcion"
          :rules="[]"
          class="ma-1 mx-2"
          v-model="form.descripcion"
        />
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
          <template v-slot:[`item.usd`]="{ item }">
            <div>{{ formatSubTotal(item.detalle, 2) }}</div>
          </template>
          <template v-slot:[`item.gs`]="{ item }">
            <div>{{ formatSubTotal(item.detalle, 1) }}</div>
          </template>

          <template slot="body.append">
            <tr>
              <th class="subtitle-2 font-weight-black hidden-xs-only">TOTAL</th>
              <th class="hidden-xs-only"></th>
              <th class="hidden-xs-only"></th>
              <th class="hidden-xs-only"></th>
              <th class="subtitle-1 text-end font-weight-black">
                {{ totalUsd }}
              </th>
              <th class="subtitle-1 text-end font-weight-black">
                {{ totalGs }}
              </th>
            </tr>
          </template>
        </v-data-table>

        <c-card-actions>
          <v-btn rounded text small color="grey" @click="confirm.dialog = false"
            >CANCELAR</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn
            rounded
            small
            elevation="0"
            :color="disabledSaveButton ? 'grey' : 'red darken-1'"
            dark
            :disabled="disabledSaveButton"
            @click="cambiarEstado()"
            >Si, quiero facturar</v-btn
          >
        </c-card-actions>
      </c-card>
    </c-dialog>
  </v-form>
</template>
<script>
import { mapActions } from 'vuex'
import { formatDetalle } from './formatter'
import { currencyFormatter } from '@/util/number.util'
import TextField from '@/components/TextField'
export default {
  components: {
    TextField
  },
  computed: {
    rules () {
      return [
        () => this.value.length > 0 || 'Seleccione una o mas actividades',
        (v) => !!v || 'Obligatorio'
      ]
    },
    totalUsd: (vm) => {
      const total = vm.form.detalle.reduce((acc, curr) => {
        const subtotal = curr.detalle.reduce((acc1, curr1) => {
          if (curr1.idmoneda.idmoneda === 2) { return (acc1 = acc1 + curr1.cantidad * curr1.precio) }
          return acc1
        }, 0)
        return (acc = acc + subtotal)
      }, 0)
      return currencyFormatter(total)
    },
    totalGs: (vm) => {
      const total = vm.form.detalle.reduce((acc, curr) => {
        const subtotal = curr.detalle.reduce((acc1, curr1) => {
          if (curr1.idmoneda.idmoneda === 1) { return (acc1 = acc1 + curr1.cantidad * curr1.precio) }
          return acc1
        }, 0)
        return (acc = acc + subtotal)
      }, 0)
      return currencyFormatter(total)
    },
    uniqueClien: (vm) => {
      if (vm.form.detalle.length === 0) return true
      const first = vm.form.detalle[0].idcliente.idcliente
      const unique = !vm.form.detalle.find(
        ({ idcliente }) => idcliente.idcliente !== first
      )
      return unique
    },
    uniqueMoney: (vm) => {
      if (vm.form.detalle.length === 0) return true
      const first = vm.form.detalle[0].detalle[0].idmoneda.idmoneda
      let unique = true
      vm.form.detalle.map(({ detalle }) => {
        detalle.map(({ idmoneda }) => {
          if (idmoneda.idmoneda !== first) unique = false
        })
      })
      return unique
    },
    disabledSaveButton: (vm) =>
      !!(!vm.uniqueClien || vm.form.detalle.length === 0),
    textButtom: (vm) =>
      vm.value.length === 0
        ? 'Seleccione una o mas actividades'
        : 'Facturar ' +
          vm.value.length +
          (vm.value.length === 1 ? ' Actividad' : ' Actividades')
  },
  props: {
    value: Array
  },
  methods: {
    ...mapActions('actividad', ['setChangeStatus']),
    async cambiarEstado () {
      this.form.idestadocobro = 2
      const response = await this.setChangeStatus(this.form)
      if (response.success) {
        this.$emit('fetch')
        this.form.idestadocobro = null
        this.confirm.dialog = false
        this.$refs.form.resetValidation()
      }
    },
    facturar () {
      this.form.detalle = JSON.parse(JSON.stringify(this.value))
      this.confirm.dialog = true
    },
    formatDetalle (detalle) {
      return formatDetalle(detalle)
    },
    formatSubTotal (detalle, idmoneda) {
      return currencyFormatter(
        detalle.reduce((acc, curr) => {
          if (curr.idmoneda.idmoneda === idmoneda) { return (acc = acc + curr.cantidad * curr.precio) }
          return acc
        }, 0)
      )
    }
  },
  data: () => ({
    confirm: {
      dialog: false
    },
    form: {
      descripcion: '',
      idestadocobro: null,
      detalle: []
    },
    headers: [
      { text: 'Cliente', value: 'idcliente.razonsocial', sortable: false },
      {
        text: 'Sucursal',
        value: 'idcliente_sucursal.descripcion',
        sortable: false
      },
      { text: 'Conceptos', value: 'detalle', sortable: false },
      { text: 'USD', value: 'usd', align: 'end', sortable: false },
      { text: 'GS', value: 'gs', align: 'end', sortable: false }
    ]
  })
}
</script>
