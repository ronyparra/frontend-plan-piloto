<template>
  <div class="fill-height">
    <HeaderForm>
      <c-toolbar-title class="flex text-center title">
        <span class="font-weight-thin">{{ $route.name }} de</span>
  
        {{ getClienteId.razonsocial || "" }}
      </c-toolbar-title>
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
            <c-col cols="12" sm="3">
              <AutocompleteFolder prefix="Carpeta -" label="" v-model="form.idcarpeta.idcarpeta" />
            </c-col>
            <c-col cols="12" sm="9">
              <TextField
                label=""
                placeholder="Descripcion"
                v-model="form.descripcion"
              />
            </c-col>
            <c-col cols="12">
              <TextField
                placeholder="Escriba un comentario..."
                :rules="[]"
                v-model="form.comentario"
              />
            </c-col>
          </c-row>
        </c-form>
        <c-form ref="formDetail">
          <c-row dense>
            <c-col cols="12" sm="4">
              <TextField
                placeholder="Titulo"
                v-model="archivo_detalle.titulo"
              />
            </c-col>
            <c-col cols="10" sm="4">
              <TextField
                ref="archivo3"
                placeholder="Descripcion"
                v-model="archivo_detalle.descripcion"
              />
            </c-col>
            <c-spacer></c-spacer>
            <BtnAdd :x-small="false" class="mt-2 mr-1" @click="addDetalle()" />
          </c-row>
        </c-form>
        <v-data-table
          dense
          :headers="headers"
          :items="form.archivo_detalle"
          :mobile-breakpoint="0"
          :items-per-page="99999"
          hide-default-footer
        >
          <template v-slot:[`item.actions`]="{ item }">
            <BtnDelete class="my-1 mr-2" @click="deletArchivo(item)" />
            <BtnEdit @click="editArchivo(item)" />
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
import Delete from "../../delete/Delete";
import HeaderForm from "../../../components/HeaderForm";
import AutocompleteFolder from "../folder/Autocomplete";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    AutocompleteFolder,
    HeaderForm,
    BtnAdd,
    BtnClose,
    BtnEdit,
    BtnDelete,
    TextField,
    Delete,
  },
  data: () => ({
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
    if (!this.getClienteId) this.fetchClienteId({ id: this.$route.params.id });
    this.form.idcarpeta.idcarpeta = Number(this.$route.params.folder);
    this.form.idcliente.idcliente = Number(this.$route.params.id);
    if (this.$route.params.idarchivo) return this.editHandler();
  },
  computed: {
    ...mapGetters("cliente", ["getClienteId"]),
    ...mapGetters("archivo", ["getArchivoId"]),
    back() {
      const idarchivo = this.$route.params.idarchivo;
      if (idarchivo) return this.$route.path.replace("/" + idarchivo,"");
      return this.$route.path.replace("/add", "");
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
            id: this.$route.params.id,
            form: this.form,
          })
        : await this.createArchivo(this.form);
      if (response.success) {
        const redirect = this.$router.history.current.query.redirect;
        if (redirect) this.$router.replace({ path: redirect });
        if (this.isEdit) this.$router.replace({ path: "/archivo" });
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
