<template>
  <c-text-field
    :value="value"
    :label="label"
    :rules="rules"
    :readonly="readonly"
    type="number"
    dense
    flat
    rounded
    @input="$emit('input', $event)"
  ></c-text-field>
</template>
<script>
export default {
  props: {
    value: [Number, String],
    label: String,
    rules: Array,
    readonly: Boolean
  }
}
</script>
