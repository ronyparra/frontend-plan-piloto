<template>
  <div>
    <c-app-bar app flat color="secondary">
      <c-toolbar-title class="title font-weight-black">
        {{ $route.name }}
      </c-toolbar-title>
      <div style="position: absolute; right: 1rem;">
        <BtnSearch class="mr-1" @click="show = !show" />
        <BtnAdd to="/cobro/add" />
      </div>
      <template v-slot:extension v-if="show">
        <SearchField class="mb-2" v-model="search" />
      </template>
    </c-app-bar>
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
      <div>{{toCurrency(item.saldoacobrar)}}</div>
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
import SearchField from "@/components/SearchField";
import { mapActions, mapGetters } from "vuex";
import { currencyFormatter } from "@/util/number.util";
export default {
  components: {
    BtnAdd,
    BtnSearch,
    SearchField,
  },
  mounted() {
    this.fetchCobro();
  },
  computed: {
    ...mapGetters("cobro", ["getCobro", "isLoading"]),
  },
  methods: {
    ...mapActions("cobro", ["fetchCobro", "fetchCobroId"]),
    async setData(data) {
      await this.fetchCobroId({ data });
      this.$router.push({ path: `/cobro/edit/` + data.idcliente_cobro });
    },
    toCurrency(value){
      return currencyFormatter(value)
    }
  },
  data: () => ({
    show: false,
    search: "",
    headers: [
      { text: "Cliente", value: "idcliente.razonsocial" },
      { text: "Monto a Cobrar", value: "saldoacobrar", align: 'end' },
      { text: "", value: "actions", align: "end", sortable: false },
    ],
  }),
};
</script>
