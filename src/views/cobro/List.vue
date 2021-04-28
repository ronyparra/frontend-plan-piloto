<template>
  <div>
    <Header>
      <SearchField class="font-weight-black" v-model="search" />
      <c-spacer></c-spacer>
      <BtnIcon @click="filter = !filter" class="mr-1">filter_alt</BtnIcon>
    </Header>
    <div class="mt-9">
      <Filters v-if="filter" :params="params" />

      <v-data-table
        :headers="headers"
        :search="search"
        :items="getCobro"
        :loading="isLoading"
        :mobile-breakpoint="0"
        :items-per-page="99999"
        hide-default-footer
      >
        <template v-slot:[`item.saldoacobrar`]="{ item }">
          <div>{{ toCurrency(item.saldoacobrar) }}</div>
        </template>
        <template v-slot:[`item.idestadocobro`]="{ item }">
          <c-chip dark :color="color(item.idestadocobro.idestadocobro)">{{
            item.idestadocobro.descripcion
          }}</c-chip>
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
import BtnIcon from "@/components/BtnIcon";
import SearchField from "@/components/SearchField";
import { mapActions, mapGetters } from "vuex";
import { currencyFormatter } from "@/util/number.util";
import { subtract_days, current_date } from "@/util/date.util";
import { formatColor } from "../actividad/formatter";
import Filters from "./Filter";
import Header from "../../components/HeaderList";
export default {
  components: {
    Header,
    Filters,
    BtnIcon,
    SearchField,
  },
  watch: {
    $route(to) {
      if (to.path === "/cobro") this.fetchCobro(this.params);
    },
  },
  mounted() {
      this.filter =this.$vuetify.breakpoint.mobile ? false : true;
    this.fetchCobro(this.params);
  },
  computed: {
    ...mapGetters("cobro", ["getCobro", "isLoading"]),
  },
  methods: {
    ...mapActions("cobro", ["fetchCobro", "fetchCobroId"]),
    color: (idestadocobro) => formatColor(idestadocobro),
    async setData(data) {
      await this.fetchCobroId({ data });
      this.$router.push({ path: `/cobro/edit/` + data.idcliente_cobro });
    },
    toCurrency(value) {
      return currencyFormatter(value);
    },
  },
  data: () => ({
    search: "",
    filter: false,
    params: {
      idcliente: null,
      fechadesde: subtract_days(90),
      fechahasta: current_date(),
      idestadocobro: 2,
    },
    headers: [
      { text: "Cliente", value: "idcliente.razonsocial" },
      { text: "Moneda", value: "idmoneda.abreviatura", align: "end" },
      { text: "Monto a Cobrar", value: "saldoacobrar", align: "end" },
      { text: "Estado", value: "idestadocobro", align: "end" },
      { text: "", value: "actions", align: "end", sortable: false },
    ],
  }),
};
</script>
