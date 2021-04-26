<template>
  <div>
    <Header>
      <SearchField class="font-weight-black" v-model="search" />
      <c-spacer></c-spacer>
      <BtnAdd to="/usuario/add" />
    </Header>

      <div class="mt-7">
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
    
  </div>
</template>
<script>
import BtnAdd from "@/components/BtnAdd";
import Header from "../../components/Header";
import SearchField from "@/components/SearchField";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    Header,
    BtnAdd,
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
