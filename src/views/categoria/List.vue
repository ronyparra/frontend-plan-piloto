<template>
  <div>
     <Header>
      <SearchField class="font-weight-black" v-model="search" />
      <c-spacer></c-spacer>
      <BtnAdd to="/categoria/add" />
     </Header>

    <div class="mt-7">
      <v-data-table
        :headers="headers"
        :search="search"
        :items="getCategoria"
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
import Header from "../../components/HeaderList";
import SearchField from "@/components/SearchField";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    Header,
    BtnAdd,
    SearchField,
  },
  mounted() {
    this.fetchCategoria();
  },
  computed: {
    ...mapGetters("categoria", ["getCategoria", "isLoading"]),
  },
  methods: {
    ...mapActions("categoria", ["fetchCategoria", "fetchCategoriaId"]),
    async setData(data) {
      await this.fetchCategoriaId({ data });
      this.$router.push({ path: `/categoria/edit/` + data.idcategoria });
    },
  },
  data: () => ({
    search: "",
    headers: [
      { text: "#", value: "idcategoria" },
      { text: "Categoria", value: "descripcion", align: "end" },
      { text: "", value: "actions", align: "end", sortable: false },
    ],
  }),
};
</script>
