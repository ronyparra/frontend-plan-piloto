<template>
  <v-switch :label="label" :inset="inset" v-model="swt" @change="$emit('input', !value), $emit('change')"><slot /></v-switch>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
      required: true
    },
    label: String,
    inset: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    swt: false
  }),
  mounted () {
    this.swt = this.value
  },
  watch: {
    value () {
      this.swt = this.value
    }
  }
}
</script>
