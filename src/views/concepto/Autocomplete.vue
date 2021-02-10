<template>
  <div>
    <InputAutocomplete
      label="Concepto"
      item-value="idconcepto"
      item-text="descripcion"
      ref="input"
      :value="value"
      :items="getConcepto"
      :loading="isLoading"
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
    value: [Number, Object, Array],
    rules: Array,
    returnObject: Boolean,
  },
  mounted() {
    this.fetchConcepto();
  },
  computed: {
    ...mapGetters("concepto", ["getConcepto", "isLoading"]),
  },
  methods: {
    ...mapActions("concepto", ["fetchConcepto"]),
    focus: (vm) => vm.$refs.input.focus(),
    isMenuActive: (vm) => vm.$refs.input.isMenuActive(),
  },
};
</script>

