<template>
  <div>
    <c-app-bar app class="mt-12" dense flat color="secondary">
      <SearchField class="font-weight-black" v-model="search" />
      <c-spacer></c-spacer>
      <BtnAdd to="/cliente/add" />
    </c-app-bar>

      <div class="mt-7">
        <v-data-table
          :headers="headers"
          :search="search"
          :items="getCliente"
          :loading="isLoading"
          :mobile-breakpoint="0"
          :items-per-page="99999"
          hide-default-footer
        >
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
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    BtnAdd,
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
    search: "",
    headers: [
      { text: "Cliente", value: "razonsocial" },
      { text: "Ruc", value: "ruc" },
      { text: "", value: "actions", align: "end", sortable: false },
    ],
  }),
};
</script>
