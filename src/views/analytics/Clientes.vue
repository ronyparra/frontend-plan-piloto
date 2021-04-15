<template>
  <div>
    <DataTable :headers="headers" :items="getCliente" filter="guarani" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import DataTable from "./DataTable";
export default {
  data: () => ({
    headers: [
      {
        title: "Cliente",
        value: "cliente",
        class: "caption text-start font-weight-medium",
        headClass: "caption text-start",
      },
      {
        title: "Cantidad",
        value: "cantidad",
        class: "caption  text-end font-weight-black",
        headClass: "caption text-end",
        number: true,
        sortable: true,
      },
      {
        title: "USD",
        value: "dolar",
        class: "caption font-weight-black text-end",
        headClass: "caption text-end",
        number: true,
        sortable: true,
      },
      {
        title: "GS",
        value: "guarani",
        class: "caption font-weight-black text-end",
        headClass: "caption text-end",
        number: true,
        sortable: true,
      },
    ],
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
