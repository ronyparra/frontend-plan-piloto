<template>
  <v-btn
    :elevation="elevation"
    text
    color="primary"
    fab
    x-small
    :disabled="disabled"
    @click="$emit('click')"
    ><c-icon><slot/></c-icon></v-btn
  >
</template>
<script>
export default {
  props: {
    elevation: {
      type: String,
      default: '2'
    },
    disabled: {
      type: Boolean
    }
  }
}
</script>
