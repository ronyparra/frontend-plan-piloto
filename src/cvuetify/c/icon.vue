<template>
  <v-icon :large="large" :x-large="xLarge" :dark="dark" :small="small" :x-small="xSmall" :color="color" @click="$emit('click')"><slot /></v-icon>
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
    small: Boolean,
    'x-small': Boolean,
    color: String,
  },
};
</script>
