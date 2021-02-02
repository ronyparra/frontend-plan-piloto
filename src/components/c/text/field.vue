<template>
  <v-text-field
    :color="color"
    :outlined="outlined"
    :rounded="rounded"
    :type="type"
    :value="value"
    autocomplete="off"
    :rules="rules"
    :prepend-inner-icon="prependInnerIcon"
    :append-icon="appendIcon"
    :label="label"
    @click:append="$emit('click:append')"
    @input="$emit('input', $event)"
  ></v-text-field>
</template>
<script>
export default {
  props: {
    value: [String, Number],
    color: {
      type: String,
      default: "primary",
    },
    type: {
      type: String,
      default: "text",
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: [Array],
      default: () => [(v) => !!v || "Obligatorio"],
    },
    label: String,
    "prepend-inner-icon": String,
    "append-icon": String,
  },
};
</script>
