<template>
  <v-list :nav="nav" :dense="dense"><slot /></v-list>
</template>
<script>
export default {
  props: {
    nav: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    }
  }
}
</script>
