<template>
  <div>
    <c-app-bar app flat color="secondary">
      <c-toolbar-title class="title font-weight-black">
        {{ $route.name }}
      </c-toolbar-title>
      <div style="position: absolute; right: 1rem;">
        <BtnSearch class="mr-1" @click="show = !show" />
        <BtnAdd to="/cliente/add" />
      </div>
      <template v-slot:extension v-if="show">
        <SearchField class="mb-2" v-model="search" />
      </template>
    </c-app-bar>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="getCliente"
      :loading="isLoading"
      :mobile-breakpoint="0"
      :items-per-page="99999"
      hide-default-footer
    >
      <template v-slot:[`item.actions`]="{item}">
        <c-btn fab x-small text elevation="2" color="primary" @click="setData(item)">
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
export default {
  components: {
    BtnAdd,
    BtnSearch,
    SearchField,
  },
  mounted() {
    this.fetchCliente();
  },
  computed: {
    ...mapGetters("cliente", ["getCliente", "isLoading"]),
  },
  methods: {
    ...mapActions("cliente", ["fetchCliente", "fetchClienteId"]),
    async setData(data) {
      await this.fetchClienteId({ data });
      this.$router.push({ path: `/cliente/edit/` + data.idcliente });
    },
  },
  data: () => ({
    show: false,
    search: "",
    headers: [
      { text: "Cliente", value: "razonsocial" },
      { text: "Ruc", value: "ruc" },
      { text: "", value: "actions", align: "end",sortable: false },
    ],
  }),
};
</script>
