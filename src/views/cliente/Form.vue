<template>
  <div class="fill-height">
    <c-app-bar app flat color="secondary">
      <BtnClose to="/cliente" />
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
                ref="cliente1"
                label="Razon Social"
                v-model="form.razonsocial"
              />
            </c-col>
            <c-col cols="12">
              <TextField ref="cliente2" label="Ruc / CI" v-model="form.ruc" />
            </c-col>
          </c-row>
        </c-form>
        <c-form ref="formDetail">
          <c-row dense>
            <c-col cols="10">
              <TextField ref="cliente3" label="Sucursal" v-model="sucursal" />
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
            <BtnDelete class="my-1" @click="deletSucursal(item)" />
          </template>
        </v-data-table>
      </c-container>
      <c-container>
        <c-btn block dark color="primary" rounded @click="guardar()">
          Registrar</c-btn
        >
      </c-container>
    </c-card>
  </div>
</template>
<script>
import BtnClose from "@/components/BtnClose";
import BtnAdd from "@/components/BtnAdd";
import BtnDelete from "@/components/BtnDelete";
import TextField from "@/components/TextField";
export default {
  components: {
    BtnAdd,
    BtnClose,
    BtnDelete,
    TextField,
  },
  data: () => ({
    sucursal: "",
    form: {
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
  methods: {
    addSucursal() {
      if (!this.$refs.formDetail.validate()) return null;
      this.form.sucursal.push({
        descripcion: this.sucursal,
        latitud: null,
        longitud: null,
      });
      this.sucursal = '';
      this.$refs.formDetail.resetValidation();
    },
    guardar() {
      if (!this.$refs.form.validate()) return null;
    },
    deletSucursal(sucursal) {
      const index = this.form.sucursal.indexOf(sucursal);
      this.form.sucursal.splice(index, 1);
    },
  },
};
</script>
