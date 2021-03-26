<template>
  <div>
    <c-app-bar app flat color="secondary">
      <c-toolbar-title class="title font-weight-black">
        {{ $route.name }}
      </c-toolbar-title>
      <div style="position: absolute; right: 1rem;">
        <BtnSearch class="mr-1" @click="show = !show" />
        <BtnAdd to="/pendiente/add" />
      </div>
      <template v-slot:extension v-if="show">
        <SearchField class="mb-2" v-model="search" />
      </template>
    </c-app-bar>
    <c-container>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="getPendiente"
      :loading="isLoading"
      :mobile-breakpoint="0"
      :items-per-page="99999"
      hide-default-footer
    >
      <template v-slot:[`item.descripcion`]="{ item }">
        <div class="caption">{{ item.descripcion }}</div>
      </template>
      <template v-slot:[`item.activo`]="{ item }"
        ><v-chip small :color="item.activo ? 'red' : 'green accent-3'"></v-chip
      ></template>
      <template v-slot:[`item.idtipo_pendiente.descripcion`]="{ item }">
        <div class="caption">{{ item.idtipo_pendiente.descripcion }}</div>
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
    </c-container>
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
    this.fetchPendiente();
  },
  computed: {
    ...mapGetters("pendiente", ["getPendiente", "isLoading"]),
  },
  methods: {
    ...mapActions("pendiente", ["fetchPendiente", "fetchPendienteId"]),
    async setData(data) {
      await this.fetchPendienteId({ data });
      this.$router.push({ path: `/pendiente/edit/` + data.idpendiente });
    },
  },
  data: () => ({
    show: false,
    search: "",
    headers: [
      { value: "activo", align: "start" },
      { text: "Pendiente", value: "descripcion" },
      { text: "Tipo", value: "idtipo_pendiente.descripcion", align: "end" },

      { text: "", value: "actions", align: "end", sortable: false },
    ],
  }),
};
</script>
