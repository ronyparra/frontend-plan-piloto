<template>
  <div>
    <c-autocomplete
      :value="value"
      ref="input"
      :items="getUsuario"
      :loading="isLoading"
      item-value="idusuario"
      :rules="rules"
      :multiple="multiple"
      item-text="nombre"
      :label="label"
      dense
      filled
      flat
      rounded
      background-color="grey lighten-4"
      @input="$emit('input', $event)"
      @change="$emit('change')"
    >
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              >No existe concidencia. Click para agregar</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </template>
    </c-autocomplete>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    value: {
      type: Number,
    },
    rules: {
      type: Array,
      default: () => {
        return [(v) => !!v || "Obligatorio"];
      },
    },
    label:{
      type: String,
      default: 'Usuario'
    },
    multiple:{
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    syncInput: null,
  }),
  mounted() {
    this.fetchUsuario();
  },
  computed: {
    ...mapGetters("usuario", ["getUsuario", "isLoading"]),
  },
  methods: {
    ...mapActions("usuario", ["fetchUsuario"]),
    focus() {
      this.$refs.input.focus();
    },
    isMenuActive() {
      this.$refs.input.isMenuActive = false;
    },
  },
};
</script>

<style></style>
