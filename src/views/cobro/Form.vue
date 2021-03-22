<template>
  <div class="fill-height">
    <c-app-bar app flat color="secondary">
      <BtnClose to="/cobro" />
      <c-toolbar-title class="flex text-center title">
        {{ $route.name }}
      </c-toolbar-title>
      <BtnDelete :text="false" v-if="isEdit" @click="deleteView = true" />
    </c-app-bar>
    <Delete
      v-model="deleteView"
      vuex-action="cobro/deleteCobro"
      :id-to-delete="$route.params.id"
      @success="$router.push({ path: '/cobro' })"
    />
    <c-card class="fill-height d-flex flex-column justify-space-between">
      <c-card-text>
        <c-form ref="form">
          <c-row dense>
            <c-col cols="12" sm="6">
              <TextField
                readonly
                :rules="[]"
                label="Descripcion"
                v-model="form.descripcion"
              />
            </c-col>
            <c-col cols="6" sm="6">
              <TextField
                readonly
                label="Cliente"
                v-model="form.idcliente.razonsocial"
              />
            </c-col>
            <c-col cols="6" sm="6">
              <TextNumber
                readonly
                label="Saldo a Cobrar"
                v-model="form.saldoacobrar"
              />
            </c-col>
          </c-row>
        </c-form>

        <c-switch
          label="Aplicar Retencion"
          v-model="form.retencion"
          @change="calcularRetencion()"
        ></c-switch>
        <c-divider class="mb-3" v-if="form.retencion"></c-divider>
        <c-row dense v-if="form.retencion">
          <c-col cols="6" sm="6">
            <TextNumber
              readonly
              label="Saldo Cobrado"
              v-model="form.saldocobrado"
            />
          </c-col>
          <c-col cols="6" sm="6">
            <TextNumber
              readonly
              label="Saldo Retenido"
              v-model="form.saldoretencion"
            />
          </c-col>
        </c-row>

        <c-divider class="mb-3"></c-divider>
        <InputSelect
          label="Seleccione Estado"
          :items="select"
          v-model="form.idestadocobro.idestadocobro"
          item-value="value"
          item-text="text"
        ></InputSelect>
        <TextArea v-model="form.comentario" />
      </c-card-text>

      <c-container>
        <c-btn block dark color="primary" rounded @click="guardar()"
          >Cobrar</c-btn
        >
      </c-container>
    </c-card>
  </div>
</template>
<script>
import BtnClose from "@/components/BtnClose";
import TextField from "@/components/TextField";
import TextNumber from "@/components/TextNumber";
import InputSelect from "@/components/InputSelect";
import TextArea from "@/components/TextArea";
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
    TextArea,
    InputSelect,
  },
  data: () => ({
    isEdit: false,
    deleteView: false,
    select: [
      {
        value: 3,
        text: "Cobrado",
      },
      {
        value: 4,
        text: "Entregado",
      },
    ],
    form: {
      idcliente_cobro: "",
      descripcion: "",
      idcliente: {
        idcliente: "",
        razonsocial: "",
      },
      retencion: false,
      saldoacobrar: 0,
      saldocobrado: 0,
      saldoretencion: 0,
      idestadocobro: {
        idestadocobro: 3,
      },
      comentario: "",
    },
    default: {
      idcliente_cobro: "",
      descripcion: "",
      idcliente: {
        idcliente: "",
        razonsocial: "",
      },
      retencion: false,
      saldoacobrar: 0,
      saldocobrado: 0,
      saldoretencion: 0,
      idestadocobro: {
        idestadocobro: 3,
      },
      comentario: "",
    },
  }),

  mounted() {
    if (this.$route.params.id) this.editHandler();
  },
  computed: {
    ...mapGetters("cobro", ["getCobroId"]),
  },
  methods: {
    ...mapActions("cobro", [
      "createCobro",
      "fetchCobro",
      "fetchCobroId",
      "updateCobro",
    ]),
    async editHandler() {
      this.isEdit = true;
      if (this.getCobroId) {
        this.form = JSON.parse(JSON.stringify(this.getCobroId));
        return (this.form.idestadocobro = JSON.parse(
          JSON.stringify(this.default.idestadocobro)
        ));
      }
      await this.fetchCobroId({ id: this.$route.params.id });
      this.form = JSON.parse(JSON.stringify(this.getCobroId));
      return (this.form.idestadocobro = JSON.parse(
        JSON.stringify(this.default.idestadocobro)
      ));
    },
    calcularRetencion() {
      const total = Number(this.form.saldoacobrar);
      if (this.form.retencion) {
        const iva = total / 11;
        const retencion = iva * 0.3;
        this.form.saldocobrado = Math.floor(total - retencion);
        this.form.saldoretencion = Math.floor(retencion);
      } else {
        this.form.saldocobrado = Math.floor(total);
      }
    },

    async guardar() {
      if (!this.$refs.form.validate()) return null;
      const response = this.isEdit
        ? await this.updateCobro({
            id: this.$route.params.id,
            form: this.form,
          })
        : await this.createCobro(this.form);
      if (response.success) {
        const redirect = this.$router.history.current.query.redirect;
        if (redirect) this.$router.replace({ path: redirect });
        if (this.isEdit) this.$router.replace({ path: "/cobro" });
        this.form = JSON.parse(JSON.stringify(this.default));
        this.$refs.form.resetValidation();
        this.fetchCobro();
      }
    },
  },
};
</script>
