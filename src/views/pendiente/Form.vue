<template>
  <div class="fill-height">
    <c-app-bar app flat color="secondary">
      <BtnClose to="/pendiente" />
      <c-toolbar-title class="flex text-center title">
        {{ $route.name }}
      </c-toolbar-title>
      <BtnDelete :text="false" v-if="isEdit" @click="deleteView = true" />
    </c-app-bar>
    <Delete
      v-model="deleteView"
      vuex-action="pendiente/deletePendiente"
      :id-to-delete="$route.params.id"
      @success="$router.push({ path: '/pendiente' })"
    />
    <c-card class="fill-height d-flex flex-column justify-space-between">
      <c-card-text>
        <c-form ref="form">
          <c-row dense>
            <c-col cols="12" sm="4">
              <TextDate ref="pendiente2" label="Fecha" v-model="form.fecha" />
            </c-col>
            <c-col cols="12" sm="4">
              <AutocompleteTipo
                v-model="form.idtipo_pendiente.idtipo_pendiente"
              />
            </c-col>
            <c-col cols="12" sm="4">
              <AutocompleteTecnico
                label="Asignar pendiente a"
                multiple
                return-object
                :rules="[]"
                v-model="form.pendiente_tecnico"
              />
            </c-col>
            <c-col cols="12">
              <TextArea
                ref="pendiente1"
                label="Descripcion"
                v-model="form.descripcion"
              />
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
import TextArea from "@/components/TextArea";
import TextDate from "@/components/TextDate";
import BtnDelete from "@/components/BtnDelete";
import { current_date } from "@/util/date.util";
import Delete from "../delete/Delete";
import { mapActions, mapGetters } from "vuex";
import AutocompleteTipo from "../tipo_pendiente/Autocomplete";
import AutocompleteTecnico from "../usuario/Autocomplete";
export default {
  components: {
    AutocompleteTecnico,
    AutocompleteTipo,
    BtnDelete,
    BtnClose,
    Delete,
    TextArea,
    TextDate,
  },
  data: () => ({
    isEdit: false,
    deleteView: false,
    form: {
      idtipo_pendiente: {
        idtipo_pendiente: null,
      },
      fecha: current_date(),
      descripcion: "",
      pendiente_tecnico: [],
    },
    default: {
      idtipo_pendiente: {
        idtipo_pendiente: null,
      },
      fecha: current_date(),
      descripcion: "",
      pendiente_tecnico: [],
    },
  }),

  mounted() {
    if (this.$route.params.id) this.editHandler();
  },
  computed: {
    ...mapGetters("pendiente", ["getPendienteId"]),
  },
  methods: {
    ...mapActions("pendiente", [
      "createPendiente",
      "fetchPendiente",
      "fetchPendienteId",
      "updatePendiente",
      "fetchDashboard",
    ]),
    async editHandler() {
      this.isEdit = true;
      if (this.getPendienteId)
        return (this.form = JSON.parse(JSON.stringify(this.getPendienteId)));
      await this.fetchPendienteId({ id: this.$route.params.id });
      this.form = JSON.parse(JSON.stringify(this.getPendienteId));
    },

    async guardar() {
      if (!this.$refs.form.validate()) return null;
      const response = this.isEdit
        ? await this.updatePendiente({
            id: this.$route.params.id,
            form: this.form,
          })
        : await this.createPendiente(this.form);
      if (response.success) {
        if (this.isEdit) this.$router.replace({ path: "/pendiente" });
        this.form = JSON.parse(JSON.stringify(this.default));
        this.$refs.form.resetValidation();
        this.fetchPendiente();
        this.fetchDashboard();
      }
    },
  },
};
</script>
