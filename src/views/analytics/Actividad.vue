<template>
  <div>
    <c-row dense>
      <c-col cols="6" sm="3" v-for="(n, i) in getActividad" :key="i">
        <c-card
          :color="n.color || 'white'"
          class="rounded-xl"
          elevation="0"
        >
          <c-container >
            <div class="caption mt-n1  grey--text">{{ n.title }}</div>

            <div
              class="caption ml-1 font-weight-black d-flex justify-space-between"
              v-for="(j, y) in n.detalle"
              :key="y"
            >
              <div>{{ j.moneda }}</div>
              <div>{{ formatNumber(j.saldo) }}</div>
            </div>
          </c-container>
        </c-card>
      </c-col>
    </c-row>
    <c-divider class="mt-3"></c-divider>
    <div cols="12"  class="d-flex justify-end mb-n3">
      <c-switch
        v-model="oldData"
        inset
        label="Incluir saldos sin cobrar anteriores"
        @change="fetch()"
      ></c-switch>
    </div>
    <DataTable
      disabled-search
      :headers="headers"
      :items="getEstado"
      filter="guarani"
    />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { currencyFormatter } from "@/util/number.util";
import DataTable from "./DataTable";
export default {
  components: {
    DataTable,
  },
  data: () => ({
    oldData: true,
    headers: [
      {
        title: "Estado",
        value: "descripcion",
        class: "caption text-start font-weight-medium d-flex justify-end align-center flex-row-reverse",
        headClass: "caption text-start",
        message: "mensaje",
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
    this.fetchActividad();
    this.fetch();
  },
  computed: {
    ...mapGetters("analytics", ["getActividad", "getEstado"]),
  },
  methods: {
    ...mapActions("analytics", ["fetchActividad", "fetchEstado"]),
    formatNumber: (value) => currencyFormatter(value),
    fetch(){
      this.fetchEstado(this.oldData)
    },
  },
};
</script>
