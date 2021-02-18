<template>
  <div>
    <InputAutocomplete
      label="Tipo"
      item-value="idtipo_pendiente"
      item-text="descripcion"
      ref="input"
      :value="value"
      :items="getTipoPendiente"
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
    this.fetchTipoPendiente();
  },
  computed: {
    ...mapGetters("tipo_pendiente", ["getTipoPendiente", "isLoading"]),
  },
  methods: {
    ...mapActions("tipo_pendiente", ["fetchTipoPendiente"]),
    focus: (vm) => vm.$refs.input.focus(),
    isMenuActive: (vm) => vm.$refs.input.isMenuActive(),
  },
};
</script>

<style></style>
