<template>
  <div class="fill-height">
    <HeaderForm>
      <c-toolbar-title class="flex text-center title">
        {{ $route.name }}
      </c-toolbar-title>
      <BtnDelete :text="false" v-if="isEdit" @click="deleteView = true" class="mr-1" />
      <BtnClose to="/usuario" />
    </HeaderForm>
    <Delete
      v-model="deleteView"
      vuex-action="usuario/deleteUsuario"
      :id-to-delete="$route.params.id"
      @success="$router.push({ path: '/usuario' })"
    />
    <c-card class="fill-height d-flex flex-column justify-space-between">
      <c-card-text>
        <c-form ref="form">
          <c-row dense>
            <c-col cols="12" sm="6">
              <TextField ref="usuario1" label="Nombre" v-model="form.nombre" />
            </c-col>
            <c-col cols="12" sm="6">
              <TextField
                ref="usuario1"
                label="Apellido"
                v-model="form.apellido"
              />
            </c-col>
            <c-col cols="12" sm="6">
              <TextField
                ref="usuario1"
                label="Username"
                v-model="form.username"
              />
            </c-col>
            <c-col cols="12" sm="6">
              <TextField
                ref="usuario1"
                label="Password"
                :rules="isEdit ? [] : undefined"
                v-model="form.password"
              />
            </c-col>
            <c-col cols="12">
              <AutocompleteRol multiple v-model="form.usuario_rol_detalle" />
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
import BtnDelete from "@/components/BtnDelete";
import Delete from "../delete/Delete";
import AutocompleteRol from "../usuario_rol/Autocomplete";
import { mapActions, mapGetters } from "vuex";
import HeaderForm from "../../components/HeaderForm";
export default {
  components: {
    HeaderForm,
    AutocompleteRol,
    BtnDelete,
    BtnClose,
    Delete,
    TextField,
  },
  data: () => ({
    isEdit: false,
    deleteView: false,
    form: {
      username: "",
      password: "",
      nombre: "",
      apellido: "",
      usuario_rol_detalle: [],
    },
    default: {
      username: "",
      password: "",
      nombre: "",
      apellido: "",
      usuario_rol_detalle: [],
    },
  }),

  mounted() {
    if (this.$route.params.id) this.editHandler();
  },
  computed: {
    ...mapGetters("usuario", ["getUsuarioId"]),
  },
  methods: {
    ...mapActions("usuario", [
      "createUsuario",
      "fetchUsuario",
      "fetchUsuarioId",
      "updateUsuario",
    ]),
    async editHandler() {
      this.isEdit = true;
      if (this.getUsuarioId)
        return (this.form = JSON.parse(JSON.stringify(this.getUsuarioId)));
      await this.fetchUsuarioId({ id: this.$route.params.id });
      this.form = JSON.parse(JSON.stringify(this.getUsuarioId));
    },

    async guardar() {
      if (!this.$refs.form.validate()) return null;
      const response = this.isEdit
        ? await this.updateUsuario({
            id: this.$route.params.id,
            form: this.form,
          })
        : await this.createUsuario(this.form);
      if (response.success) {
        if (this.isEdit) this.$router.replace({ path: "/usuario" });
        this.form = JSON.parse(JSON.stringify(this.default));
        this.$refs.form.resetValidation();
        this.fetchUsuario();
      }
    },
  },
};
</script>
