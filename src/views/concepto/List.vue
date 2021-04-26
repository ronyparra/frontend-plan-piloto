<template>
  <div>
     <Header>
      <SearchField class="font-weight-black" v-model="search" />
      <c-spacer></c-spacer>
      <BtnAdd to="/concepto/add" />
    </Header>

    <div class="mt-7">
      <v-data-table
        :headers="headers"
        :search="search"
        :items="getConcepto"
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
import SearchField from "@/components/SearchField";
import { mapActions, mapGetters } from "vuex";
import { currencyFormatter } from "@/util/number.util";
import Header from "../../components/Header";
export default {
  components: {
    Header,
    BtnAdd,
    SearchField,
  },
  mounted() {
    this.fetchConcepto();
  },
  computed: {
    ...mapGetters("concepto", ["getConcepto", "isLoading"]),
  },
  methods: {
    ...mapActions("concepto", ["fetchConcepto", "fetchConceptoId"]),
    async setData(data) {
      await this.fetchConceptoId({ data });
      this.$router.push({ path: `/concepto/edit/` + data.idconcepto });
    },
    toCurrency(value) {
      return currencyFormatter(value);
    },
  },
  data: () => ({
    search: "",
    headers: [
      { text: "Concepto", value: "descripcion" },
      { text: "Precio", value: "precio", align: "end" },
      { text: "Moneda", value: "idmoneda.abreviatura", align: "end" },
      { text: "Categoria", value: "idcategoria.descripcion", align: "end" },
      { text: "", value: "actions", align: "end", sortable: false },
    ],
  }),
};
</script>
