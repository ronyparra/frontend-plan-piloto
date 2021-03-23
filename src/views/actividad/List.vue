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
      @sync="syncronizarFiltro($event)"
      @fetch="fetch()"
      @pdf="generarPDF()"
    />

    <v-data-table
      :headers="headers"
      :search="search"
      :items="desserts"
      :loading="isLoading"
      :header-props="headerProps"
      :items-per-page="9999999"
      :show-select="filter"
      item-key="idactividad"
      v-model="selected"
      hide-default-footer
      @toggle-select-all="selectAllToggle"
    >
      <template v-slot:[`item.idestadocobro`]="{ item }">
        <c-chip dark :color="color(item.idestadocobro.idestadocobro)">{{
          item.idestadocobro.descripcion
        }}</c-chip>
      </template>
      <template v-slot:[`item.detalle`]="{ item }">
        <div>{{ formatDetalle(item.detalle) }}</div>
      </template>
      <template v-slot:[`item.tecnico`]="{ item }">
        <div>{{ formatTecnico(item.tecnico) }}</div>
      </template>
      <template
        v-slot:[`item.data-table-select`]="{ item, isSelected, select }"
      >
        <v-simple-checkbox
          :value="isSelected"
          :readonly="item.idestadocobro.idestadocobro !== 1"
          :disabled="item.idestadocobro.idestadocobro !== 1"
          @input="select($event)"
          :ripple="false"
        ></v-simple-checkbox>
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
import { formatTecnico, formatDetalle, formatColor } from "./formatter";
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
    ...mapGetters("cliente", ["getCliente"]),
  },
  watch: {
    getActividad(items) {
      items.map((item) => {
        if (item.idestadocobro.idestadocobro !== 1) this.disabledCount += 1;
      });
      this.desserts = JSON.parse(JSON.stringify(items));
    },
    $route(to){
      if(to.path ==='/actividad') this.fetch();
    }
  },
  methods: {
    ...mapActions("actividad", ["fetchActividad", "fetchActividadId"]),
    color: (estadocobro) => formatColor(estadocobro),
    selectAllToggle(props) {
      if (this.selected.length != this.desserts.length - this.disabledCount) {
        this.selected = [];
        const self = this;
        props.items.forEach((item) => {
          if (item.idestadocobro.idestadocobro === 1) {
            self.selected.push(item);
          }
        });
      } else this.selected = [];
    },
    fetch() {
      this.selected = [];

      this.fetchActividad(this.params);
    },
    async setData(data) {
      await this.fetchActividadId({ data });
      this.$router.push({ path: `/actividad/edit/` + data.idactividad });
    },
    syncronizarFiltro(filtro) {
      this.params = JSON.parse(JSON.stringify(filtro));
    },
    generarPDF() {
      if (this.params.idcliente) {
        const cliente = this.getCliente.find(
          ({ idcliente }) => idcliente === this.params.idcliente
        );
        this.params.cliente = cliente.razonsocial;
        return exportPDF(this.headers, this.getActividad, this.params);
      }
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
    disabledCount: 0,
    selected: [],
    desserts: [],
    params: {
      idcliente: null,
      idsucursal: null,
      fechadesde: subtract_days(90),
      fechahasta: current_date(),
      idestadocobro: 1,
    },
    headerProps: {
      sortByText: "Filtrar por",
    },
    headers: [
      { text: "#", value: "idactividad" },
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
