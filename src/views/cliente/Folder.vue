<template>
  <div>
    <Header>
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
        <template v-slot:[`item.actions`]="{item}">
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
    this.fetchFolder();
  },
  computed: {
    ...mapGetters("folder", ["getFolder", "isLoading"]),
  },
  methods: {
    ...mapActions("folder", ["fetchFolder", "fetchFolderId"]),
    async setData(data) {
      const idcliente = this.$route.params.id;
      await this.fetchFolderId({ data });
      this.$router.push({ path: `/cliente/folder/` + idcliente + "/archivos" });
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
