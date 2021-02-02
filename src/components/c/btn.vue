<template>
  <v-btn
    :block="block"
    :color="color"
    :dark="dark"
    :rounded="rounded"
    :x-large="xLarge"
    @click="$emit('click')"
    ><slot
  /></v-btn>
</template>
<script>
export default {
  props: {
    block: {
      type: Boolean,
      defaut: false,
    },
    color: {
      type: String,
      default: "primary",
    },
    dark: {
      type: Boolean,
      defaut: false,
    },
    rounded: {
      type: Boolean,
      defaut: false,
    },
    "x-large": {
      type: Boolean,
      defaut: false,
    },
  },
};
</script>
