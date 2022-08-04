<template>
  <v-textarea
    :value="value"
    :label="label"
    :readonly="readonly"
    :placeholder="placeholder"
    dense
    outlined
    rounded
    @input="$emit('input', $event)"
  ></v-textarea>
</template>
<script>
export default {
  props: {
    value: String,
    placeholder: String,
    label: String,
    readonly: Boolean
  }
}
</script>
