<template>
  <div>
    <DataTable :headers="headers" :items="getCategoria" filter="guarani" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import DataTable from "./DataTable";
export default {
  components: {
    DataTable,
  },
  data: () => ({
    headers: [
      {
        title: "Categoria",
        value: "descripcion",
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
        percent: true,
        sortable: true,
      },
      {
        title: "GS",
        value: "guarani",
        class: "caption font-weight-black text-end",
        headClass: "caption text-end",
        number: true,
        percent: true,
        sortable: true,
      },
    ],
  }),
  mounted() {
    this.fetchCategoria();
  },
  computed: {
    ...mapGetters("analytics", ["getCategoria"]),
  },
  methods: {
    ...mapActions("analytics", ["fetchCategoria"]),
  },
};
</script>
