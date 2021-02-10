<template>
  <v-icon :large="large" :x-large="xLarge" :dark="dark" :color="color"><slot /></v-icon>
</template>
<script>
export default {
  props: {
    large: {
      type: Boolean,
      default: false,
    },
    dark: Boolean,
    'x-large': Boolean,
    color: String,
  },
};
</script>
