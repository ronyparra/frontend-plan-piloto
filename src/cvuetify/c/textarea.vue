<template>
  <v-textarea
    :label="label"
    :value="value"
    autocomplete="off"
    :hint="hint"
    :filled="filled"
    :dense="dense"
    :rounded="rounded"
    @input="$emit('input', $event)"
  ></v-textarea>
</template>
<script>
export default {
  props: {
    value: String,
    label: String,
    hint: String,
    filled: Boolean,
    dense: Boolean,
    rounded: Boolean,
  },
};
</script>
