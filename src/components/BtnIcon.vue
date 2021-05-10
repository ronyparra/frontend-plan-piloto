<template>
  <c-btn
    :elevation="elevation"
    text
    color="primary"
    fab
    x-small
    :disabled="disabled"
    @click="$emit('click')"
    ><c-icon><slot/></c-icon></c-btn
  >
</template>
<script>
export default {
  props:{
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

