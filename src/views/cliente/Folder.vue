<template>
  <div>
    <HeaderForm>
      <c-toolbar-title class="flex text-end title">
        <span class="font-weight-thin">Carpetas de</span>
        {{ getClienteId.razonsocial }}
      </c-toolbar-title>
    </HeaderForm>
    <Header>
      <BtnIcon elevation="0" @click="routeBack()">arrow_back</BtnIcon>
      <c-spacer></c-spacer>
      <SearchField class="font-weight-black" v-model="search" />
      <c-spacer></c-spacer>
      <BtnAdd to="/folder/add" />
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
        <template v-slot:[`item.razonsocial`]="{ item }">
          <c-icon class="mr-2" color="primary">
            drive_file_move
          </c-icon>
          <span class="font-weight-medium">{{ item.razonsocial }}</span>
        </template>
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
    Header,
    HeaderForm,
    BtnIcon,
    BtnAdd,
    SearchField,
  },
  mounted() {
     if (!this.getClienteId) this.fetchClienteId({ id: this.$route.params.id });
    this.fetchFolder();
  },
  computed: {
     ...mapGetters("cliente", ["getClienteId"]),
    ...mapGetters("folder", ["getFolder", "isLoading"]),
  },
  methods: {
    ...mapActions("folder", ["fetchFolder"]),
    ...mapActions("cliente",["fetchClienteId"]),
    async setData(item) {
      const idcliente = this.$route.params.id;
      const idfolder = item.idcarpeta;
      console.log(this.$route);
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
