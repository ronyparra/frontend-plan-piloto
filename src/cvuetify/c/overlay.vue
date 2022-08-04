<template>
  <v-overlay  :opacity="opacity"  :value="value" :absolute="absolute"
    ><slot
  /></v-overlay>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    absolute: {
      type: Boolean,
      default: false
    },
    opacity: {
      type: Number,
      default: 0.46
    }
  }
}
</script>
