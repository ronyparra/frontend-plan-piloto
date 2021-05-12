<template>
  <div class="fill-height">
    <HeaderForm>
      <c-toolbar-title class="flex text-center title mr-1">
        {{ $route.name }} </c-toolbar-title>
      <BtnEdit
        v-if="isEdit && !formControlls"
        @click="formControlls = true"
        class="mr-1"
      />
      <BtnDelete
        :text="false"
        v-if="isEdit"
        @click="deleteView = true"
        class="mr-1"
      />
      <BtnClose :to="back" />
    </HeaderForm>
    <Delete
      v-model="deleteView"
      vuex-action="archivo/deleteArchivo"
      :id-to-delete="$route.params.id"
      @success="$router.push({ path: '/cliente' })"
    />
    <c-card class="fill-height d-flex flex-column justify-space-between">
      <c-container>
        <c-form ref="form">
          <c-row dense>
            <c-col cols="12" sm="9">
              <TextField
                :readonly="!formControlls"
                label=""
                placeholder="Descripcion"
                v-model="form.descripcion"
              />
            </c-col>
            <c-col cols="12">
              <TextField
                :readonly="!formControlls"
                placeholder="Escriba un comentario..."
                :rules="[]"
                v-model="form.comentario"
              />
            </c-col>
          </c-row>
        </c-form>
      </c-container>
      <c-container v-if="formControlls">
        <c-btn block dark color="primary" rounded @click="guardar()">
          {{ isEdit ? "Modificar" : "Registrar" }}</c-btn
        >
      </c-container>
    </c-card>
  </div>
</template>
<script>
import BtnClose from "@/components/BtnClose";
import BtnEdit from "@/components/BtnEdit";
import BtnDelete from "@/components/BtnDelete";
import TextField from "@/components/TextField";
import Delete from "../../delete/Delete";
import HeaderForm from "../../../components/HeaderForm";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    HeaderForm,
    BtnClose,
    BtnEdit,
    BtnDelete,
    TextField,
    Delete,
  },
  data: () => ({
    formControlls: true,
    archivo_detalle: {
      descripcion: "",
      latitud: null,
      longitud: null,
    },
    isEdit: false,
    deleteView: false,
    form: {
      idcliente: {
        idcliente: null,
      },
      idcarpeta: {
        idcarpeta: null,
      },
      descripcion: null,
      comentario: null,
      archivo_detalle: [],
    },
    default: {
      idcliente: {
        idcliente: null,
      },
      idcarpeta: {
        idcarpeta: null,
      },
      descripcion: null,
      comentario: null,
      archivo_detalle: [],
    },
    headers: [
      {
        text: "Titulo",
        align: "start",
        value: "titulo",
      },
      {
        text: "Descripcion",
        align: "end",
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
    if (!this.getClienteId) this.fetchClienteId({ id: this.$route.params.id });
    this.form.idcarpeta.idcarpeta = Number(this.$route.params.folder);
    this.form.idcliente.idcliente = Number(this.$route.params.id);
    if (this.$route.params.idarchivo) return this.editHandler();
  },
  computed: {
    ...mapGetters("cliente", ["getClienteId", "getClienteName"]),
    ...mapGetters("archivo", ["getArchivoId"]),
    back() {
      const idarchivo = this.$route.params.idarchivo;
      if (idarchivo) return this.$route.path.replace("/" + idarchivo, "");
      return this.$route.path.replace("/add", "");
    },
    tableHeaders() {
      const headers = JSON.parse(JSON.stringify(this.headers));
      if (this.formControlls) return headers;
      headers.pop();
      return headers;
    },
  },
  methods: {
    ...mapActions("cliente", ["fetchClienteId"]),
    ...mapActions("archivo", [
      "createArchivo",
      "fetchArchivoId",
      "updateArchivo",
    ]),
    async editHandler() {
      this.isEdit = true;
      this.formControlls = false;
      if (this.getArchivoId)
        return (this.form = JSON.parse(JSON.stringify(this.getArchivoId)));
      await this.fetchArchivoId({ id: this.$route.params.idarchivo });

      this.form = JSON.parse(JSON.stringify(this.getArchivoId));
    },
    addDetalle() {
      if (!this.$refs.formDetail.validate()) return null;
      this.form.archivo_detalle.push(this.archivo_detalle);
      this.archivo_detalle = {
        idcliente: null,
        descripcion: "",
        titulo: "",
      };
      this.$refs.formDetail.resetValidation();
    },
    async guardar() {
      if (!this.$refs.form.validate()) return null;
      const response = this.isEdit
        ? await this.updateArchivo({
            id: this.$route.params.idarchivo,
            form: this.form,
          })
        : await this.createArchivo(this.form);
      if (response.success) {
        if (this.isEdit)
          this.$router.replace({
            path: this.$route.path.replace(
              "/" + this.$route.params.idarchivo,
              ""
            ),
          });
        this.form = JSON.parse(JSON.stringify(this.default));
        this.$refs.form.resetValidation();
        this.form.idcarpeta.idcarpeta = Number(this.$route.params.folder);
        this.form.idcliente.idcliente = Number(this.$route.params.id);
      }
    },

    deletArchivo(archivo_detalle) {
      const index = this.form.archivo_detalle.indexOf(archivo_detalle);
      this.form.archivo_detalle.splice(index, 1);
    },
    editArchivo(archivo_detalle) {
      this.archivo_detalle = null;
      this.archivo_detalle = archivo_detalle;
      this.deletArchivo(archivo_detalle);
    },
  },
};
</script>
