<template>
  <c-text-field
    :value="value"
    :label="label"
    :rules="rules"
    :readonly="readonly"
    type="number"
    filled
    dense
    flat
    rounded
    background-color="grey lighten-4"
    @input="$emit('input', $event)"
  ></c-text-field>
</template>
<script>
export default {
  props: {
    value: [Number,String],
    label: String,
    rules: Array,
    readonly: Boolean
  },
};
</script>
