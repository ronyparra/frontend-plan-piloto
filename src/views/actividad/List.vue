<template>
  <div>
    <c-app-bar app flat color="secondary">
      <c-toolbar-title class="title font-weight-black">
        {{ $route.name }}
      </c-toolbar-title>
      <div style="position: absolute; right: 3%;">
        <BtnSearch class="mr-1" @click="show = !show" />
        <BtnAdd to="/actividad/add" />
      </div>
      <template v-slot:extension v-if="show">
        <SearchField class="mb-2" v-model="search" />
      </template>
    </c-app-bar>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="getActividad"
      :loading="isLoading"
      :mobile-breakpoint="0"
      :items-per-page="99999"
      hide-default-footer
    >
      <template v-slot:[`item.actions`]>
        <c-btn fab x-small text elevation="2" color="primary">
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
    this.fetchActividad();
  },
  computed: {
    ...mapGetters("actividad", ["getActividad", "isLoading"]),
  },
  methods: {
    ...mapActions("actividad", ["fetchActividad"]),
  },
  data: () => ({
    show: false,
    search: "",
    headers: [
      {
        text: "#",
        align: "start",
        value: "idactividad",
      },
      { text: "Fecha", value: "fecha" },
      { text: "Cliente", value: "idcliente.razonsocial" },
      { text: "", value: "actions", align: "end" },
    ],
  }),
};
</script>
