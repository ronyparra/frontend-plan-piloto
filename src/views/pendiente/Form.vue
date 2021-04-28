<template>
  <div class="fill-height">
    <HeaderForm>
      <c-toolbar-title class="flex text-center title">
        {{ $route.name }}
      </c-toolbar-title>
      <BtnDelete
        :text="false"
        v-if="isEdit && form.activo"
        @click="deleteView = true"
        class="mr-1"
      />
      <BtnClose to="/pendiente" />
    </HeaderForm>
    <Delete
      v-model="deleteView"
      vuex-action="pendiente/deletePendiente"
      :id-to-delete="$route.params.id"
      @success="$router.push({ path: '/pendiente' })"
    />
    <c-card class="fill-height d-flex flex-column justify-space-between">
      <c-container>
        <c-form ref="form">
          <c-row dense>
            <c-col cols="12" sm="4">
              <TextDate
                ref="pendiente2"
                :readonly="!form.activo"
                label="Fecha"
                v-model="form.fecha"
              />
            </c-col>
            <c-col cols="12" sm="4">
              <AutocompleteTipo
                :readonly="!form.activo"
                v-model="form.idtipo_pendiente.idtipo_pendiente"
              />
            </c-col>
            <c-col cols="12" sm="4">
              <AutocompleteTecnico
                :readonly="!form.activo"
                label="Asignar pendiente a"
                multiple
                return-object
                :rules="[]"
                v-model="form.pendiente_tecnico"
              />
            </c-col>
            <c-col cols="12">
              <TextArea
                :readonly="!form.activo"
                ref="pendiente1"
                label="Descripcion"
                v-model="form.descripcion"
              />
            </c-col>
          </c-row>
        </c-form>
      </c-container>

      <c-container v-if="form.activo">
        <c-row dense>
          <c-col cols="12" sm="5">
            <c-btn block dark color="primary" rounded @click="guardar()">
              {{ isEdit ? "Modificar" : "Registrar" }}</c-btn
            >
          </c-col>
          <c-spacer></c-spacer>
          <c-col cols="12" sm="5" v-if="isEdit">
            <c-btn
              block
              text
              elevation="2"
              color="primary"
              rounded
              @click="sheet = !sheet"
            >
              Finalizar</c-btn
            >
          </c-col>
        </c-row>
      </c-container>
      <Finalizar v-model="sheet" />
    </c-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { current_date } from "@/util/date.util";

import BtnClose from "@/components/BtnClose";
import TextArea from "@/components/TextArea";
import TextDate from "@/components/TextDate";
import BtnDelete from "@/components/BtnDelete";
import Delete from "../delete/Delete";
import Finalizar from "./Finalizar";
import AutocompleteTipo from "../tipo_pendiente/Autocomplete";
import AutocompleteTecnico from "../usuario/Autocomplete";
import HeaderForm from "../../components/HeaderForm";
export default {
  components: {
    AutocompleteTecnico,
    AutocompleteTipo,
    Finalizar,
    BtnDelete,
    BtnClose,
    Delete,
    TextArea,
    TextDate,
    HeaderForm
  },
  data: () => ({
    sheet: false,
    isEdit: false,
    deleteView: false,
    form: {
      activo: true,
      idtipo_pendiente: {
        idtipo_pendiente: null,
      },
      fecha: current_date(),
      descripcion: "",
      pendiente_tecnico: [],
    },
    default: {
      activo: true,
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
      "setChangeStatus",
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
