<template>
  <div>
    <DataTable :headers="headers" :items="getCliente" :item-body="itemBody" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import DataTable from "./DataTable";
export default {
  data: () => ({
    headers: [
      {
        title: 'Cliente'
      },
      {
        title: 'Resumen',
        sortable: true
      }
    ],
    itemBody:{
      title: 'cliente',
      detTitle: 'Actividades',
      detCant: 'cant_actividad'
    }
  }),
  components: {
    DataTable,
  },
  mounted() {
    this.fetchCliente();
  },

  computed: {
    ...mapGetters("analytics", ["getCliente"]),
  },
  methods: {
    ...mapActions("analytics", ["fetchCliente"]),
  },
};
</script>
