<template>
  <div>
     <DataTable :headers="headers" :items="getConcepto" :item-body="itemBody" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import DataTable from "./DataTable";
export default {
  components: {
    DataTable,
  },
  data:()=>({
     headers: [
      {
        title: 'Concepto'
      },
      {
        title: 'Resumen',
        sortable: true
      }
    ],
     itemBody:{
      title: 'concepto',
      detTitle: 'Conceptos',
      detCant: 'cant_concepto'
    }
  }),
  mounted() {
    this.fetchConcepto();
  },
  computed: {
    ...mapGetters("analytics", ["getConcepto"]),
  },
  methods: {
    ...mapActions("analytics", ["fetchConcepto"]),
  },
};
</script>
