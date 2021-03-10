<template>
  <v-toolbar :flat="flat" :dense="dense"
    ><slot
  /></v-toolbar>
</template>
<script>
export default {
  props: {
    flat: Boolean,
    dense: Boolean,
  },
};
</script>
