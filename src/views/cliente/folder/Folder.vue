<template>
  <div>
    <HeaderForm>
      <c-toolbar-title class="flex text-end title">
        <span class="font-weight-thin">Carpetas de</span>
        {{ getClienteName}}
      </c-toolbar-title>
    </HeaderForm>
    <Header>
      <BtnIcon elevation="0" @click="routeBack()">arrow_back</BtnIcon>
      <c-spacer></c-spacer>
      <SearchField class="font-weight-black" v-model="search" />

    </Header>

    <div class="mt-7">
      <v-data-table
        :headers="headers"
        :search="search"
        :items="getFolder"
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
import BtnIcon from "@/components/BtnIcon";
import SearchField from "@/components/SearchField";
import Header from "../../../components/HeaderList";
import HeaderForm from "../../../components/HeaderForm";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    Header,
    HeaderForm,
    BtnIcon,
    SearchField,
  },
  mounted() {
     if (!this.getClienteId) this.fetchClienteId({ id: this.$route.params.id });
    this.fetchFolder();
  },
  computed: {
     ...mapGetters("cliente", ["getClienteId","getClienteName"]),
    ...mapGetters("folder", ["getFolder", "isLoading"]),

  },
  methods: {
    ...mapActions("folder", ["fetchFolder"]),
    ...mapActions("cliente",["fetchClienteId"]),
    async setData(item) {
      const idcliente = this.$route.params.id;
      const idfolder = item.idcarpeta;
      this.$router.push({
        path: `/cliente/` + idcliente + "/folder/" + idfolder + "/archivos",
      });
    },
    routeBack() {
      this.$router.push({ path: `/cliente` });
    },
  },
  data: () => ({
    search: "",
    headers: [
      { text: "Carpeta", value: "descripcion" },
      { text: "", value: "actions", align: "end", sortable: false },
    ],
  }),
};
</script>
