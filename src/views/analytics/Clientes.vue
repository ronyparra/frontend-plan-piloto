<template>
  <div>
    <DataTable :headers="headers" :items="getCliente" filter="guarani">
      <template v-slot:cliente="{ item }">
        <div>
          {{ item.cliente }}
          <c-icon color="primary" dense class="ml-1" @click="listarActividad(item.idcliente)">arrow_forward</c-icon>
        </div>
      </template>
    </DataTable>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import DataTable from './DataTable'
export default {
  data: () => ({
    headers: [
      {
        title: 'Cliente',
        value: 'cliente',
        class: 'caption text-start font-weight-medium',
        headClass: 'caption text-start'
      },
      {
        title: 'Cantidad',
        value: 'cantidad',
        class: 'caption  text-end font-weight-black',
        headClass: 'caption text-end',
        number: true,
        sortable: true
      },
      {
        title: 'USD',
        value: 'dolar',
        class: 'caption font-weight-black text-end',
        headClass: 'caption text-end',
        number: true,
        percent: true,
        sortable: true
      },
      {
        title: 'GS',
        value: 'guarani',
        class: 'caption font-weight-black text-end',
        headClass: 'caption text-end',
        number: true,
        percent: true,
        sortable: true
      }
    ]
  }),
  components: {
    DataTable
  },
  mounted () {
    this.fetchCliente()
  },

  computed: {
    ...mapGetters('analytics', ['getCliente', 'getParams'])
  },
  methods: {
    ...mapActions('analytics', ['fetchCliente']),
    ...mapActions('actividad', ['setParams']),
    async listarActividad (id) {
      await this.setParams({
        idcliente: id,
        idsucursal: null,
        fechadesde: this.getParams.desde,
        fechahasta: this.getParams.hasta,
        idestadocobro: null
      })
      this.$router.push('/actividad')
    }
  }
}
</script>
