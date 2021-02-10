<template>
  <v-autocomplete
    :value="value"
    :id="id"
    ref="input"
    :hide-details="hideDetails"
    :clearable="clearable"
    :outlined="outlined"
    :item-value="itemValue"
    :rules="rules"
    :item-text="itemText"
    :dense="dense"
    :filled="filled"
    :multiple="multiple"
    :items="items"
    :chips="chips"
    :small-chips="smallChips"
    :return-object="returnObject"
    :label="label"
    :disabled="disabled"
    :readonly="readonly"
    :solo="solo"
    :flat="flat"
    :rounded="rounded"
    :background-color="backgroundColor"
    @input="$emit('input', $event)"
    @change="$emit('change')"
  >
    <template v-slot:no-data><slot name="no-data"/></template>
  </v-autocomplete>
</template>
<script>
export default {
  props: {
    value: [Object, Number, Array, String],
    items: {
      type: Array,
    },
    id: String,
    "hide-details": {
      type: Boolean,
      default: false,
    },
    "item-text": String,
    "item-value": String,
    "background-color": String,
    rules: {
      type: Array,
      default: () => [],
    },
    filled: {
      type: Boolean,
      default: false,
    },
    solo: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    flat: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    dense: {
      type: Boolean,
      default: false,
    },
    chips: {
      type: Boolean,
      default: false,
    },
    "small-chips": {
      type: Boolean,
      default: false,
    },
    "return-object": {
      type: Boolean,
      default: false,
    },
    label: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    focus: (vm) => vm.$refs.input.focus(),
    isMenuActive: (vm) => (vm.$refs.input.isMenuActive = false),
  },
};
</script>
