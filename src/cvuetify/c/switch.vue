<template>
  <v-switch :label="label" :inset="inset" :value="value" @change="$emit('input', !value)"><slot /></v-switch>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    label: String,
    inset:{
        type: Boolean,
        default: false
    }
  },
};
</script>