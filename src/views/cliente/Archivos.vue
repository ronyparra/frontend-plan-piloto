<template>
  <div>
    <HeaderForm>
      <c-toolbar-title class="flex text-end title">
        <span class="font-weight-thin">Datos de</span>
        {{ getClienteName  }}
      </c-toolbar-title>
    </HeaderForm>
    <Header>
      <BtnIcon elevation="0" @click="routeBack()">arrow_back</BtnIcon>
      <c-spacer></c-spacer>
      <SearchField class="font-weight-black" v-model="search" />
      <c-spacer></c-spacer>
      <BtnAdd :to="`${$route.path}/add`" />
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
        <template v-slot:[`item.actions`]="{ item }">
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
    ...mapGetters("cliente", ["getClienteId","getClienteName"]),
    ...mapGetters("archivo", ["getArchivoIdCliente", "isLoading"]),

  },
  methods: {
    ...mapActions("cliente", ["fetchClienteId"]),
    ...mapActions("archivo", ["fetchArchivoIdCliente", "fetchArchivoId"]),
    async setData(data) {
      await this.fetchArchivoId({ data });
      this.$router.push({ path: this.$route.path + "/" + data.idarchivo });
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
      { text: "", value: "actions", align: "end", sortable: false },
    ],
  }),
};
</script>
