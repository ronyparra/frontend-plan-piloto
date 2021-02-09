<template>
  <div class="fill-height">
    <c-app-bar app flat color="secondary">
      <BtnClose to="/concepto" />
      <c-toolbar-title class="flex text-center title">
        {{ $route.name }}
      </c-toolbar-title>
    </c-app-bar>

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
              <TextField ref="concepto2" label="Precio" v-model="form.precio" />
            </c-col>
          </c-row>
        </c-form>
      </c-container>
      <c-container>
        <c-btn block dark color="primary" rounded @click="guardar()">
          Registrar</c-btn
        >
      </c-container>
    </c-card>
    <LoadingCircular :value="isLoading" />
  </div>
</template>
<script>
import BtnClose from "@/components/BtnClose";
import LoadingCircular from "@/components/LoadingCircular";
import TextField from "@/components/TextField";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    BtnClose,
    TextField,
    LoadingCircular,
  },
  data: () => ({
    sucursal: "",
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
  computed: {
    ...mapGetters("concepto", ["isLoading"]),
  },
  methods: {
    ...mapActions("concepto", ["createConcepto", "fetchConcepto"]),
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
      const response = await this.createConcepto(this.form);
      if (response.success) {
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
