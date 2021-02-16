<template>
  <div>
    <InputAutocomplete
      label="Sucursal"
      item-value="idcliente_sucursal"
      item-text="descripcion"
      ref="input"
      :value="value"
      :items="items"
      :rules="rules"
      :return-object="returnObject"
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
    value: [Number, Object],
    items: Array,
    rules: Array,
    returnObject: Boolean,
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
