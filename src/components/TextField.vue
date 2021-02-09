<template>
  <c-text-field
    :value="value"
    :label="label"
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
    value: String,
    label: String,
  },
};
</script>
