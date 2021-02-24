<template>
  <div>
    <InputAutocomplete
      label="Grupo de Usuario"
      item-value="idgrupo_usuario"
      item-text="descripcion"
      ref="input"
      :value="value"
      :items="getGrupo"
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
    this.fetchGrupo();
  },
  computed: {
    ...mapGetters("grupo", ["getGrupo", "isLoading"]),
  },
  methods: {
    ...mapActions("grupo", ["fetchGrupo"]),
    focus: (vm) => vm.$refs.input.focus(),
    isMenuActive: (vm) => vm.$refs.input.isMenuActive(),
  },
};
</script>

<style></style>
