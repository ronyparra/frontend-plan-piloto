<template>
  <v-navigation-drawer
    :value="value"
    :absolute="absolute"
    :temporary="temporary"
    ><slot />
    <template v-slot:prepend><slot name="prepend"/></template>
  </v-navigation-drawer>
</template>
<script>
export default {
  props: {
    value: Boolean,
    absolute: {
      type: Boolean,
      default: false,
    },
    temporary: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
