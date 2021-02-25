<template>
  <div>
    <InputAutocomplete
      label="Rol de Usuario"
      item-value="idusuario_rol"
      item-text="descripcion"
      ref="input"
      :value="value"
      :items="getUsuarioRol"
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
    multiple: Boolean,
  },
  mounted() {
    this.fetchUsuarioRol();
  },
  computed: {
    ...mapGetters("usuario_rol", ["getUsuarioRol", "isLoading"]),
  },
  methods: {
    ...mapActions("usuario_rol", ["fetchUsuarioRol"]),
    focus: (vm) => vm.$refs.input.focus(),
    isMenuActive: (vm) => vm.$refs.input.isMenuActive(),
  },
};
</script>

<style></style>
