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
      <c-container>
        <c-form ref="form">
          <c-row dense>
            <c-col cols="12">
              <TextField
                ref="concepto1"
                label="Descripcion"
                v-model="form.descripcion"
              />
            </c-col>
            <c-col cols="12">
              <TextNumber
                ref="concepto2"
                label="Precio"
                v-model="form.precio"
              />
            </c-col>
          </c-row>
        </c-form>
      </c-container>
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
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    BtnDelete,
    BtnClose,
    Delete,
    TextField,
    TextNumber,
  },
  data: () => ({
    sucursal: "",
    isEdit: false,
    deleteView: false,
    form: {
      razonsocial: "",
      ruc: "",
      sucursal: [],
    },
    default: {
      razonsocial: "",
      ruc: "",
      sucursal: [],
    },
    headers: [
      {
        text: "Sucursal",
        align: "start",
        value: "descripcion",
      },

      {
        text: "#",
        align: "end",
        value: "actions",
      },
    ],
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
    addSucursal() {
      if (!this.$refs.formDetail.validate()) return null;
      this.form.sucursal.push({
        descripcion: this.sucursal,
        latitud: null,
        longitud: null,
      });
      this.sucursal = "";
      this.$refs.formDetail.resetValidation();
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

    deletSucursal(sucursal) {
      const index = this.form.sucursal.indexOf(sucursal);
      this.form.sucursal.splice(index, 1);
    },
  },
};
</script>
