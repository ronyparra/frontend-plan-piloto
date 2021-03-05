<template>
  <div>
    <InputAutocomplete
      :label="label"
      item-value="idcliente_sucursal"
      item-text="descripcion"
      :placeholder="placeholder"
      ref="input"
      :loading="isLoading"
      :value="value"
      :items="sucursal"
      :clearable="clearable"
      :rules="rules"
      :filled="filled"
      :dense="dense"
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
    placeholder: String,
    label:{
      type: String,
      default: 'Sucursal'
    },
    clearable:Boolean,
    idcliente: {
      type: Number,
      default: null,
    },
    filled: {
      type: Boolean,
      default: true,
    },
    dense: {
      type: Boolean,
      default: true,
    },
    rules: Array,
    returnObject: Boolean,
  },
  mounted() {
    this.fetchCliente();
  },
  computed: {
    ...mapGetters("cliente", ["getCliente", "isLoading"]),
    sucursal: (vm) => {
      if (!vm.idcliente) return [];
      let suc = vm.getCliente
        .filter((cliente) => cliente.idcliente === vm.idcliente)
        .reduce((acc, curr) => {
          return (acc = curr.sucursal);
        }, []);
      return suc;
    },
  },
  methods: {
    ...mapActions("cliente", ["fetchCliente"]),
    focus: (vm) => vm.$refs.input.focus(),
    isMenuActive: (vm) => vm.$refs.input.isMenuActive(),
  },
};
</script>
