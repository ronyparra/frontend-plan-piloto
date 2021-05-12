<template>
  <div>
    <Header>
      <SearchField class="font-weight-black" v-model="search" />
      <c-spacer></c-spacer>
      <BtnAdd to="/cliente/add" />
    </Header>

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
          <c-icon color="primary" small class="mr-3" @click="setFolder(item)">
            folder
          </c-icon>
          <c-icon color="primary" small @click="setData(item)">
            arrow_forward_ios
          </c-icon>
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
    async setFolder(data) {
      await this.fetchClienteId({ data });
      this.$router.push({ path: `/cliente/` + data.idcliente + "/folder" });
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
