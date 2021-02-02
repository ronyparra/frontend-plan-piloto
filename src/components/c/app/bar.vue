<template>
  <v-app-bar :color="color" :flat="flat" :dense="dense" :app="app">
    <slot />
  </v-app-bar>
</template>
<script>
export default {
  props: {
    color: String,
    dense: {
      type: Boolean,
      default: false,
    },
    flat: {
      type: Boolean,
      default: false,
    },
    app: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
