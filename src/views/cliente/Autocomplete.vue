<template>
  <div>
    <InputAutocomplete
      :label="label"
      item-value="idcliente"
      item-text="razonsocial"
      ref="input"
      :value="value"
      :items="getCliente"
      :loading="isLoading"
      :placeholder="placeholder"
      :clearable="clearable"
      :rules="rules"
      :filled="filled"
      :readonly="readonly"
      :dense="dense"
      :return-object="returnObject"
      @input="$emit('input', $event)"
      @change="$emit('change')"
      :to="to"
      :redirect="redirect"
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
    value: [Number, Object, String],
    rules: Array,
    returnObject: Boolean,
    clearable: Boolean,
    readonly: Boolean,
    filled: {
      type: Boolean,
      default: true,
    },
    dense: {
      type: Boolean,
      default: true,
    },
    redirect: String,
    placeholder: String,
    label: {
      type: String,
      default: "Cliente",
    },
    to: {
      type: String,
      default: "/cliente/add",
    },
  },
  mounted() {
    this.fetchCliente();
  },
  computed: {
    ...mapGetters("cliente", ["getCliente", "isLoading"]),
  },
  methods: {
    ...mapActions("cliente", ["fetchCliente"]),
    focus: (vm) => vm.$refs.input.focus(),
    isMenuActive: (vm) => vm.$refs.input.isMenuActive(),
  },
};
</script>
