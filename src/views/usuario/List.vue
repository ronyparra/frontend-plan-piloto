<template>
  <div>
    <c-app-bar app flat color="secondary">
      <c-toolbar-title class="title font-weight-black">
        {{ $route.name }}
      </c-toolbar-title>
      <div style="position: absolute; right: 1rem;">
        <BtnSearch class="mr-1" @click="show = !show" />
        <BtnAdd to="/usuario/add" />
      </div>
      <template v-slot:extension v-if="show">
        <SearchField class="mb-2" v-model="search" />
      </template>
    </c-app-bar>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="getUsuario"
      :loading="isLoading"
      :mobile-breakpoint="0"
      :items-per-page="99999"
      hide-default-footer
    >
      <template v-slot:[`item.precio`]="{ item }">
        <div>{{ toCurrency(item.precio) }}</div>
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
export default {
  components: {
    BtnAdd,
    BtnSearch,
    SearchField,
  },
  mounted() {
    this.fetchUsuario();
  },
  computed: {
    ...mapGetters("usuario", ["getUsuario", "isLoading"]),
  },
  methods: {
    ...mapActions("usuario", ["fetchUsuario", "fetchUsuarioId"]),
    async setData(data) {
      await this.fetchUsuarioId({ data });
      this.$router.push({ path: `/usuario/edit/` + data.idusuario });
    },
  },
  data: () => ({
    show: false,
    search: "",
    headers: [
      { text: "Nombre", value: "nombre" },
      { text: "Apellido", value: "apellido" },
      { text: "Nombre Usuario", value: "username", align: "end" },
      { text: "", value: "actions", align: "end", sortable: false },
    ],
  }),
};
</script>
