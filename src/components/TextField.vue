<template>
  <c-text-field
    :value="value"
    :label="label"
    :rules="rules"
    :readonly="readonly"
    :placeholder="placeholder"
    dense
    flat
    rounded
    @input="$emit('input', $event)"
  ></c-text-field>
</template>
<script>
export default {
  props: {
    value: String,
    label: String,
    readonly: Boolean,
    placeholder: String,
    rules: Array
  }
}
</script>
