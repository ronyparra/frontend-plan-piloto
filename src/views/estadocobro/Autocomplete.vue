<template>
  <div>
    <InputAutocomplete
      :label="label"
      item-value="idestadocobro"
      item-text="descripcion"
      ref="input"
      :value="value"
      :items="getEstadoCobro"
      :loading="isLoading"
      :rules="rules"
      :clearable="clearable"
      :filled="filled"
      :placeholder="placeholder"
      :dense="dense"
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
    value: [Number, Object, Array, String],
    rules: Array,
    returnObject: Boolean,
    multiple: Boolean,
    clearable:Boolean,
    placeholder: String,
    label:{
      type: String,
      default: 'Estado Cobro'
    },
    filled: {
      type: Boolean,
      default: true,
    },
    dense: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    this.fetchEstadoCobro();
  },
  computed: {
    ...mapGetters("estadocobro", ["getEstadoCobro", "isLoading"]),
  },
  methods: {
    ...mapActions("estadocobro", ["fetchEstadoCobro"]),
    focus: (vm) => vm.$refs.input.focus(),
    isMenuActive: (vm) => vm.$refs.input.isMenuActive(),
  },
};
</script>

<style></style>
