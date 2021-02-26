<template>
  <div>
    <InputAutocomplete
      :label="label"
      item-value="idusuario"
      item-text="nombre"
      ref="input"
      :value="value"
      :items="getUsuario"
      :loading="isLoading"
      :rules="rules"
      :return-object="returnObject"
      :multiple="multiple"
      @input="$emit('input', $event)"
      @change="$emit('change')"
    />
  </div>
</template>

<script>
import InputAutocomplete from "@/components/InputAutocomplete";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    InputAutocomplete,
  },
  props: {
    value: [Number, Object, Array],
    rules: Array,
    returnObject: Boolean,
    label:{
      type: String,
      default: 'Tecnico'
    },
    multiple: Boolean,
  },
  mounted() {
    this.fetchUsuario();
  },
  computed: {
    ...mapGetters("usuario", ["getUsuario", "isLoading"]),
  },
  methods: {
    ...mapActions("usuario", ["fetchUsuario"]),
    focus: (vm) => vm.$refs.input.focus(),
    isMenuActive: (vm) => vm.$refs.input.isMenuActive(),
  },
};
</script>

<style></style>
