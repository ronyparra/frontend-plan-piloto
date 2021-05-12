<template>
  <c-textarea
    :value="value"
    :label="label"
    :readonly="readonly"
    :placeholder="placeholder"
    filled
    dense
    rounded
    @input="$emit('input', $event)"
  ></c-textarea>
</template>
<script>
export default {
  props: {
    value: String,
    placeholder: String,
    label: String,
    readonly: Boolean,
  },
};
</script>
