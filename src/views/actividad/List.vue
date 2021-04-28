<template>
  <div>
    <Header>
      <SearchField class="font-weight-black" v-model="search" />
      <c-spacer></c-spacer>
      <div>
        <BtnIcon @click="filter = !filter" class="mr-1">filter_alt</BtnIcon>
        <BtnAdd to="/actividad/add" />
      </div>
    </Header>
    <div class="mt-10">
      <FilterAdvanced
        :params="getParams"
        v-if="filter"
        :value="selected"
        @fetch="fetch()"
        @pdf="generarPDF()"
      />

      <v-data-table
        :headers="headers"
        :search="search"
        :items="desserts"
        :custom-filter="customFilter"
        :loading="isLoading"
        :header-props="headerProps"
        :items-per-page="9999999"
        :show-select="filter"
        item-key="idactividad"
        v-model="selected"
        hide-default-footer
        @toggle-select-all="selectAllToggle"
      >
        <template v-slot:[`item.idestadocobro.idestadocobro`]="{ item }">
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
  </div>
</template>
<script>
import BtnAdd from "@/components/BtnAdd";
import BtnIcon from "@/components/BtnIcon";
import SearchField from "@/components/SearchField";

import { mapActions, mapGetters } from "vuex";
import { formatTecnico, formatDetalle, formatColor } from "./formatter";
import { exportPDF } from "./export";
import FilterAdvanced from "./Filter";
import Header from "../../components/HeaderList";

export default {
  components: {
    FilterAdvanced,
    Header,
    BtnIcon,
    BtnAdd,
    SearchField,
  },

  mounted() {
    this.filter =this.$vuetify.breakpoint.mobile ? false : true;
    this.fetch();
  },
  computed: {
    ...mapGetters("actividad", ["getActividad", "isLoading", "getParams"]),
    ...mapGetters("cliente", ["getCliente"]),
  },
  watch: {
    getActividad(items) {
      items.map((item) => {
        if (item.idestadocobro.idestadocobro !== 1) this.disabledCount += 1;
      });
      this.desserts = JSON.parse(JSON.stringify(items));
    },
    $route(to) {
      if (to.path === "/actividad") this.fetch();
    },
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
      this.fetchActividad(this.getParams);
    },
    async setData(data) {
      await this.fetchActividadId({ data });
      this.$router.push({ path: `/actividad/edit/` + data.idactividad });
    },

    customFilter(value, search, item) {
      const textOne = this.formatDetalle(item.detalle);
      const textTwo = this.formatTecnico(item.tecnico);
      return (
        (value != null &&
          search != null &&
          typeof value === "string" &&
          value
            .toString()
            .toLocaleUpperCase()
            .indexOf(search.toLocaleUpperCase()) > -1) ||
        textOne.toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) > -1 ||
        textTwo.toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) > -1
      );
    },
    generarPDF() {
      if (this.getParams.idcliente) {
        const cliente = this.getCliente.find(
          ({ idcliente }) => idcliente === this.getParams.idcliente
        );
        this.getParams.cliente = cliente.razonsocial;
        return exportPDF(this.headers, this.getActividad, this.getParams);
      }
      exportPDF(this.headers, this.getActividad, this.getParams);
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
    search: "",
    disabledCount: 0,
    selected: [],
    desserts: [],
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
      { text: "Estado", value: "idestadocobro.idestadocobro" },
      { text: "", value: "actions", align: "end", sortable: false },
    ],
  }),
};
</script>
