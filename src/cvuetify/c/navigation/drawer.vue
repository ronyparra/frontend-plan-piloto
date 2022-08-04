<template>
  <v-navigation-drawer
    :value="value"
    :absolute="absolute"
    :temporary="temporary"
    :app="app"
    :clipped="clipped"
    ><slot />
    <template v-slot:prepend><slot name="prepend"/></template>
  </v-navigation-drawer>
</template>
<script>
export default {
  props: {
    value: Boolean,
    app: Boolean,
    clipped: Boolean,
    absolute: {
      type: Boolean,
      default: false
    },
    temporary: {
      type: Boolean,
      default: false
    }
  }
}
</script>
