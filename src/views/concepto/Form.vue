<template>
  <div class="fill-height">
    <c-app-bar app flat color="secondary">
      <BtnClose to="/concepto" />
      <c-toolbar-title class="flex text-center title">
        {{ $route.name }}
      </c-toolbar-title>
      <BtnDelete :text="false" v-if="isEdit" @click="deleteView = true" />
    </c-app-bar>
    <Delete
      v-model="deleteView"
      vuex-action="concepto/deleteConcepto"
      :id-to-delete="$route.params.id"
      @success="$router.push({ path: '/concepto' })"
    />
    <c-card class="fill-height d-flex flex-column justify-space-between">
      <c-card-text>
        <c-form ref="form">
          <c-row dense>
            <c-col cols="12" sm="4">
              <TextField
                ref="concepto1"
                label="Descripcion"
                v-model="form.descripcion"
              />
            </c-col>
            <c-col cols="12" sm="4">
              <TextNumber
                ref="concepto2"
                label="Precio"
                v-model="form.precio"
              />
            </c-col>
            <c-col cols="12" sm="4">
              <AutocompleteMoneda v-model="form.idmoneda.idmoneda" />
            </c-col>
          </c-row>
        </c-form>
      </c-card-text>
      <c-container>
        <c-btn block dark color="primary" rounded @click="guardar()">
          {{ isEdit ? "Modificar" : "Registrar" }}</c-btn
        >
      </c-container>
    </c-card>
  </div>
</template>
<script>
import BtnClose from "@/components/BtnClose";
import TextField from "@/components/TextField";
import TextNumber from "@/components/TextNumber";
import BtnDelete from "@/components/BtnDelete";
import Delete from "../delete/Delete";
import AutocompleteMoneda from "../moneda/Autocomplete";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    AutocompleteMoneda,
    BtnDelete,
    BtnClose,
    Delete,
    TextField,
    TextNumber,
  },
  data: () => ({
    isEdit: false,
    deleteView: false,
    form: {
      descripcion: "",
      precio: "",
      idmoneda: {
        idmoneda: null,
      },
    },
    default: {
      descripcion: "",
      precio: "",
      idmoneda: {
        idmoneda: null,
      },
    },
  }),

  mounted() {
    if (this.$route.params.id) this.editHandler();
  },
  computed: {
    ...mapGetters("concepto", ["getConceptoId"]),
  },
  methods: {
    ...mapActions("concepto", [
      "createConcepto",
      "fetchConcepto",
      "fetchConceptoId",
      "updateConcepto",
    ]),
    async editHandler() {
      this.isEdit = true;
      if (this.getConceptoId)
        return (this.form = JSON.parse(JSON.stringify(this.getConceptoId)));
      await this.fetchConceptoId({ id: this.$route.params.id });
      this.form = JSON.parse(JSON.stringify(this.getConceptoId));
    },

    async guardar() {
      if (!this.$refs.form.validate()) return null;
      const response = this.isEdit
        ? await this.updateConcepto({
            id: this.$route.params.id,
            form: this.form,
          })
        : await this.createConcepto(this.form);
      if (response.success) {
        const redirect = this.$router.history.current.query.redirect;
        if (redirect) this.$router.replace({ path: redirect });
        if (this.isEdit) this.$router.replace({ path: "/concepto" });
        this.form = JSON.parse(JSON.stringify(this.default));
        this.$refs.form.resetValidation();
        this.fetchConcepto();
      }
    },
  },
};
</script>
