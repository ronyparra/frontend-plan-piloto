<template>
  <v-alert :dense="dense" :text="text" :type="type"><slot /></v-alert>
</template>
<script>
export default {
  props: {
    dense: Boolean,
    type: String,
    text: Boolean
  }
}
</script>
