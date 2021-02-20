<template>
  <div>
    <c-app-bar app flat color="secondary">
      <c-toolbar-title class="title font-weight-black">
        {{ $route.name }}
      </c-toolbar-title>
      <div style="position: absolute; right: 1rem;">
        <BtnIcon @click="filter = !filter">filter_alt</BtnIcon>
        <BtnSearch class="mx-1" @click="show = !show" />
        <BtnAdd to="/actividad/add" />
      </div>
      <template v-slot:extension v-if="show">
        <SearchField class="mb-2" v-model="search" />
      </template>
    </c-app-bar>
    <FilterAdvanced
      :params="params"
      v-if="filter"
      :value="selected"
      @fetch="fetch()"
      @pdf="generarPDF()"
    />

    <v-data-table
      :headers="headers"
      :search="search"
      :items="getActividad"
      :loading="isLoading"
      :header-props="headerProps"
      :items-per-page="9999999"
      :show-select="filter"
      item-key="idactividad"
      v-model="selected"
      hide-default-footer
    >
      <template v-slot:[`item.idestadocobro`]="{ item }">
        <c-chip
          dark
          :color="
            item.idestadocobro.idestadocobro === 1
              ? 'red darken-1'
              : 'green accent-4'
          "
          >{{ item.idestadocobro.descripcion }}</c-chip
        >
      </template>
      <template v-slot:[`item.detalle`]="{ item }">
        <div>{{ formatDetalle(item.detalle) }}</div>
      </template>
      <template v-slot:[`item.tecnico`]="{ item }">
        <div>{{ formatTecnico(item.tecnico) }}</div>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <c-btn
          fab
          x-small
          text
          elevation="2"
          color="primary"
          @click="setData(item)"
        >
          <c-icon>
            arrow_forward_ios
          </c-icon>
        </c-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import BtnAdd from "@/components/BtnAdd";
import BtnSearch from "@/components/BtnSearch";
import BtnIcon from "@/components/BtnIcon";
import SearchField from "@/components/SearchField";

import { mapActions, mapGetters } from "vuex";
import { subtract_days, current_date } from "@/util/date.util";
import { formatTecnico, formatDetalle } from "./formatter";
import { exportPDF } from "./export";
import FilterAdvanced from "./Filter";

export default {
  components: {
    FilterAdvanced,

    BtnIcon,
    BtnAdd,
    BtnSearch,
    SearchField,
  },
  mounted() {
    this.fetch();
  },
  computed: {
    ...mapGetters("actividad", ["getActividad", "isLoading"]),
  },
  methods: {
    ...mapActions("actividad", ["fetchActividad", "fetchActividadId"]),
    fetch() {
      this.selected = [];
      this.fetchActividad(this.params);
    },
    async setData(data) {
      await this.fetchActividadId({ data });
      this.$router.push({ path: `/actividad/edit/` + data.idactividad });
    },
    generarPDF() {
      exportPDF(this.headers, this.getActividad, this.params);
    },
    formatDetalle(detalle) {
      return formatDetalle(detalle);
    },
    formatTecnico(tecnico) {
      return formatTecnico(tecnico);
    },
  },
  data: () => ({
    filter: false,
    show: false,
    search: "",
    selected: [],
    params: {
      idcliente: null,
      fechadesde: subtract_days(90),
      fechahasta: current_date(),
      idestadocobro: null,
    },
    headerProps: {
      sortByText: "Filtrar por",
    },
    headers: [
      { text: "Fecha", value: "fecha" },
      { text: "Cliente", value: "idcliente.razonsocial" },
      { text: "Sucursal", value: "idcliente_sucursal.descripcion" },
      { text: "Solicitado por", value: "solicitante" },
      { text: "Anotado por", value: "idusuario.nombre" },
      { text: "Conceptos", value: "detalle" },
      { text: "Tecnicos", value: "tecnico" },
      { text: "Comentario", value: "comentario", sortable: false },
      { text: "Estado", value: "idestadocobro", sortable: false },
      { text: "", value: "actions", align: "end", sortable: false },
    ],
  }),
};
</script>
