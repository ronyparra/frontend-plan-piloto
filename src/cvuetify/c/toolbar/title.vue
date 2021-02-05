<template>
  <v-toolbar-title :flat="flat" :dense="dense"><slot /></v-toolbar-title>
</template>
<script>
export default {
  props: {
    flat: {
      type: Boolean,
      default: false,
    },
    dense: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
