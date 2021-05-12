<template>
  <v-textarea
    :label="label"
    :value="value"
    autocomplete="off"
    :hint="hint"
    :filled="filled"
    :dense="dense"
    :rounded="rounded"
    :placeholder="placeholder"
    :readonly="readonly"
    @input="$emit('input', $event)"
  ></v-textarea>
</template>
<script>
export default {
  props: {
    value: String,
    placeholder: String,
    label: String,
    hint: String,
    filled: Boolean,
    dense: Boolean,
    rounded: Boolean,
    readonly:Boolean
  },
};
</script>
