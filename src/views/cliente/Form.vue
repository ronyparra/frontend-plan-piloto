<template>
  <div class="fill-height">
    <HeaderForm
    >
      <c-toolbar-title class="flex text-center title">
        {{ $route.name }}
      </c-toolbar-title>
      <BtnDelete
        :text="false"
        v-if="isEdit"
        @click="deleteView = true"
        class="mr-1"
      />
      <BtnClose to="/cliente" />
    </HeaderForm>
    <Delete
      v-model="deleteView"
      vuex-action="cliente/deleteCliente"
      :id-to-delete="$route.params.id"
      @success="$router.push({ path: '/cliente' })"
    />
    <c-card class="fill-height d-flex flex-column justify-space-between">
      <c-container>
        <c-form ref="form">
          <c-row dense>
            <c-col cols="12" sm="6">
              <TextField
                ref="cliente1"
                label="Razon Social"
                v-model="form.razonsocial"
              />
            </c-col>
            <c-col cols="12" sm="6">
              <TextField ref="cliente2" label="Ruc / CI" v-model="form.ruc" />
            </c-col>
          </c-row>
        </c-form>
        <c-form ref="formDetail">
          <c-row dense>
            <c-col cols="10">
              <TextField
                ref="cliente3"
                label="Sucursal"
                v-model="sucursal.descripcion"
              />
            </c-col>
            <c-spacer></c-spacer>
            <BtnAdd :x-small="false" class="mt-2 mr-1" @click="addSucursal()" />
          </c-row>
        </c-form>
        <v-data-table
          dense
          :headers="headers"
          :items="form.sucursal"
          :mobile-breakpoint="0"
          :items-per-page="99999"
          hide-default-footer
        >
          <template v-slot:[`item.actions`]="{ item }">
            <BtnDelete class="my-1 mr-2" @click="deletSucursal(item)" />
            <BtnEdit @click="editSucursal(item)" />
          </template>
        </v-data-table>
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
import BtnAdd from "@/components/BtnAdd";
import BtnEdit from "@/components/BtnEdit";
import BtnDelete from "@/components/BtnDelete";
import TextField from "@/components/TextField";
import Delete from "../delete/Delete";
import HeaderForm from "../../components/HeaderForm";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    HeaderForm,
    BtnAdd,
    BtnClose,
    BtnEdit,
    BtnDelete,
    TextField,
    Delete,
  },
  data: () => ({
    sucursal: {
      descripcion: "",
      latitud: null,
      longitud: null,
    },
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
    ...mapGetters("cliente", ["getClienteId"]),
  },
  methods: {
    ...mapActions("cliente", [
      "createCliente",
      "fetchCliente",
      "fetchClienteId",
      "updateCliente",
    ]),
    async editHandler() {
      this.isEdit = true;
      if (this.getClienteId)
        return (this.form = JSON.parse(JSON.stringify(this.getClienteId)));
      await this.fetchClienteId({ id: this.$route.params.id });
      this.form = JSON.parse(JSON.stringify(this.getClienteId));
    },
    addSucursal() {
      if (!this.$refs.formDetail.validate()) return null;
      this.form.sucursal.push(this.sucursal);
      this.sucursal = {
        descripcion: "",
        latitud: null,
        longitud: null,
      };
      this.$refs.formDetail.resetValidation();
    },
    async guardar() {
      if (!this.$refs.form.validate()) return null;
      const response = this.isEdit
        ? await this.updateCliente({
            id: this.$route.params.id,
            form: this.form,
          })
        : await this.createCliente(this.form);
      if (response.success) {
        const redirect = this.$router.history.current.query.redirect;
        if (redirect) this.$router.replace({ path: redirect });
        if (this.isEdit) this.$router.replace({ path: "/cliente" });
        this.form = JSON.parse(JSON.stringify(this.default));
        this.$refs.form.resetValidation();
        this.fetchCliente();
      }
    },

    deletSucursal(sucursal) {
      const index = this.form.sucursal.indexOf(sucursal);
      this.form.sucursal.splice(index, 1);
    },
    editSucursal(sucursal) {
      this.sucursal = JSON.parse(JSON.stringify(sucursal));
      this.deletSucursal(sucursal);
    },
  },
};
</script>
