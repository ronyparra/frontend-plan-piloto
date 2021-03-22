<template>
  <v-select
    :value="value"
    ref="input"
    :items="items"
    :loading="loading"
    :item-value="itemValue"
    :rules="rules"
    :placeholder="placeholder"
    :return-object="returnObject"
    :item-text="itemText"
    :label="label"
    :multiple="multiple"
    :chips="chips"
    :small-chips="chips"
    :readonly="readonly"
    :clearable="clearable"
    :filled="filled"
    :dense="dense"
    flat
    rounded
    background-color="grey lighten-4"
    @input="$emit('input', $event)"
    @change="$emit('change')"
  >
  </v-select>
</template>
<script>
export default {
  props: {
    value: [String, Number, Object, Array],
    items: Array,
    loading: Boolean,
    itemValue: String,
    label: String,
    itemText: String,
    multiple: Boolean,
    chips: Boolean,
    clearable: Boolean,
    readonly: Boolean,
    placeholder: String,
    filled: {
      type: Boolean,
      default: true,
    },
    dense: {
      type: Boolean,
      default: true,
    },
    rules: {
      type: Array,
      default: function() {
        return this.validator;
      },
    },
    returnObject: {
      type: Boolean,
      default: false,
    },
    to: String,
    redirect: String,
  },
  computed: {
    validator: (vm) => {
      if (vm.multiple) return [(v) => v.length > 0 || "Obligatorio"];
      return vm.returnObject
        ? [(v) => !!v[vm.itemValue] || "Obligatorio"]
        : [(v) => !!v || "Obligatorio"];
    },
  },
  methods: {
    focus: (vm) => vm.$refs.input.focus(),
    isMenuActive: (vm) => vm.$refs.input.isMenuActive(),
  },
};
</script>
