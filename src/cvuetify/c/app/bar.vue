<template>
  <v-app-bar :color="color" extension-height="48"  :bottom="bottom" :absolute="absolute"  :flat="flat" :dense="dense" :app="app">
    <slot />
    <template v-slot:extension v-if="$slots.extension"><slot name="extension"/></template>
  </v-app-bar>
</template>
<script>
export default {
  props: {
    color: String,
    bottom: Boolean,
    dense: {
      type: Boolean,
      default: false,
    },
    flat: {
      type: Boolean,
      default: false,
    },
    absolute:{
      type: Boolean,
      default: false
    },
    app: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
