<template>
  <div>
    <HeaderForm>
      <c-toolbar-title class="flex text-end title">
        <span class="font-weight-thin">Archivos de</span>
        {{ getClienteId.razonsocial }}
      </c-toolbar-title>
    </HeaderForm>
    <Header>
      <BtnIcon elevation="0" @click="routeBack()">arrow_back</BtnIcon>
      <c-spacer></c-spacer>
      <SearchField class="font-weight-black" v-model="search" />
      <c-spacer></c-spacer>
      <BtnAdd to="/archivo/add" />
    </Header>

    <div class="mt-7">
      <v-data-table
        :headers="headers"
        :search="search"
        :items="getArchivoIdCliente"
        :loading="isLoading"
        :mobile-breakpoint="0"
        :items-per-page="99999"
        hide-default-footer
      >
        <template v-slot:[`item.razonsocial`]="{ item }">
          <c-icon class="mr-2" color="primary">
            drive_file_move
          </c-icon>
          <span class="font-weight-medium">{{ item.razonsocial }}</span>
        </template>
        <template v-slot:[`item.actions`]="">
          <c-icon color="primary" small>
            arrow_forward_ios
          </c-icon>
        </template>
      </v-data-table>
    </div>
  </div>
</template>
<script>
import BtnAdd from "@/components/BtnAdd";
import BtnIcon from "@/components/BtnIcon";
import SearchField from "@/components/SearchField";
import Header from "../../components/HeaderList";
import HeaderForm from "../../components/HeaderForm";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    HeaderForm,
    Header,
    BtnIcon,
    BtnAdd,
    SearchField,
  },
  mounted() {
    if (!this.getClienteId) this.fetchClienteId({ id: this.$route.params.id });
    const params = {
      id: this.$route.params.id,
      idcarpeta: this.$route.params.folder,
    };
    this.fetchArchivoIdCliente(params);
  },
  computed: {
    ...mapGetters("cliente", ["getClienteId"]),
    ...mapGetters("archivo", ["getArchivoIdCliente", "isLoading"]),
  },
  methods: {
    ...mapActions("cliente", ["fetchClienteId"]),
    ...mapActions("archivo", ["fetchArchivoIdCliente", "fetchFolderId"]),
    async setData(data) {
      await this.fetchFolderId({ data });
      this.$router.push({ path: `/archivo/edit/` + data.idcliente });
    },
    routeBack() {
      this.$router.push({
        path: `/cliente/` + this.$route.params.id + "/folder",
      });
    },
  },
  data: () => ({
    search: "",
    headers: [
      { text: "Archivo", value: "descripcion" },
      { text: "Informacion", value: "comentario" },
    ],
  }),
};
</script>
