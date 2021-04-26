<template>
  <v-app-bar :color="color"  :elevation="elevation" extension-height="48" :clipped-left="clippedLeft" :bottom="bottom" :absolute="absolute"  :flat="flat" :dense="dense" :app="app">
    <slot />
    <template v-slot:extension v-if="$slots.extension"><slot name="extension"/></template>
  </v-app-bar>
</template>
<script>
export default {
  props: {
    color: String,
    bottom: Boolean,
    elevation: String,
    'clipped-left': Boolean,
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
