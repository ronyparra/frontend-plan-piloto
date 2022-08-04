<template>
  <v-footer :color="color" height="60%" :absolute="absolute" :app="app" :padless="padless"
    ><slot
  /></v-footer>
</template>
<script>
export default {
  props: {
    padless: {
      type: Boolean,
      default: false
    },
    absolute: {
      type: Boolean,
      default: false
    },
    app: {
      type: Boolean,
      default: false
    },
    color: String
  }
}
</script>
