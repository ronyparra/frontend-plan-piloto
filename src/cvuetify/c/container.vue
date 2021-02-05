<template>
  <v-container :fluid="fluid" :fill-height="fillHeight"><slot /></v-container>
</template>
<script>
export default {
  props: {
    fluid: {
      type: Boolean,
      default: false,
    },
    "fill-height": {
      type: Boolean,
      default: false,
    },
  },
};
</script>
