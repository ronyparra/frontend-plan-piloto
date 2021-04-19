<template>
  <div>
    <InputAutocomplete
      label="Categoria"
      item-value="idcategoria"
      item-text="descripcion"
      ref="input"
      :value="value"
      :items="getCategoria"
      :loading="isLoading"
      :readonly="readonly"
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
    value: [Number, Object, Array],
    rules: Array,
    readonly: Boolean,
    returnObject: Boolean,
    redirect: String,
    to: {
      type: String,
      default: '/categoria/add'
    },
  },
  mounted() {
    this.fetchCategoria();
  },
  computed: {
    ...mapGetters("categoria", ["getCategoria", "isLoading"]),
  },
  methods: {
    ...mapActions("categoria", ["fetchCategoria"]),
    focus: (vm) => vm.$refs.input.focus(),
    isMenuActive: (vm) => vm.$refs.input.isMenuActive(),
  },
};
</script>
