<template>
  <div>
    <Header>
      <SearchField class="font-weight-black" v-model="search" />
      <c-spacer></c-spacer>
      <BtnAdd to="/pendiente/add" />
    </Header>

      <div class="mt-7">
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
            ><v-chip
              small
              :color="item.activo ? 'red' : 'green accent-3'"
            ></v-chip
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
      </div>

  </div>
</template>
<script>
import BtnAdd from "@/components/BtnAdd";
import SearchField from "@/components/SearchField";
import Header from "../../components/HeaderList";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    Header,
    BtnAdd,
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
