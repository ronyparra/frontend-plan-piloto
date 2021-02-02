<template>
  <v-switch :label="label" :inset="inset" :value="value" @input="$emit('input', $event)"><slot /></v-switch>
</template>
<script>
export default {
  props: {
    value: Boolean,
    label: String,
    inset:{
        type: Boolean,
        default: false
    }
  },
};
</script>