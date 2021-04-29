<template>
  <div>
    <DataTable :headers="headers" :items="getCobroTecnico" filter="guarani">
    </DataTable>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import DataTable from "./DataTable";
export default {
  data: () => ({
    headers: [
      {
        title: "Colaborador",
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
  components: {
    DataTable,
  },
  mounted() {
    this.fetchCobroTecnico();
  },

  computed: {
    ...mapGetters("analytics", ["getCobroTecnico","getParams"]),
  },
  methods: {
    ...mapActions("analytics", ["fetchCobroTecnico"]),
    ...mapActions("actividad", ["setParams"]),
    async listarActividad(id) {
      await this.setParams({
        idcliente: id,
        idsucursal: null,
        fechadesde: this.getParams.desde,
        fechahasta: this.getParams.hasta,
        idestadocobro: null,
      });
      this.$router.push("/actividad");
    },
  },
};
</script>
