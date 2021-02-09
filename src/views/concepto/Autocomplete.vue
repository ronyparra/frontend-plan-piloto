<template>
  <div>
    <c-autocomplete
      :value="value"
      ref="input"
      :items="getConcepto"
      :loading="isLoading"
      item-value="idconcepto"
      :rules="rules"
      item-text="descripcion"
      label="Concepto"
      filled
      dense
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
  },
  data: () => ({
    syncInput: null,
  }),
  mounted() {
    this.fetchConcepto();
  },
  computed: {
    ...mapGetters("concepto", ["getConcepto", "isLoading"]),
  },
  methods: {
    ...mapActions("concepto", ["fetchConcepto"]),
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
