<template>
  <div>
    <InputAutocomplete
      label="Cliente"
      item-value="idcliente"
      item-text="razonsocial"
      ref="input"
      :value="value"
      :items="getCliente"
      :loading="isLoading"
      :rules="rules"
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
    value: [Number, Object],
    rules: Array,
    returnObject: Boolean,
    redirect: String,
    to: {
      type: String,
      default: '/cliente/add'
    }
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
