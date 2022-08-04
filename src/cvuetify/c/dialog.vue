<template>
  <v-dialog :value="value" :max-width="maxWidth" :persistent="persistent"
    ><slot
  /></v-dialog>
</template>
<script>
export default {
  props: {
    value: Boolean,
    maxWidth: [String, Number],
    persistent: Boolean
  }
}
</script>
