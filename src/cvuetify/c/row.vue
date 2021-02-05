<template>
  <v-row :width="width" :dense="dense"><slot /></v-row>
</template>
<script>
export default {
  props: {
    width: String,
    dense: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
