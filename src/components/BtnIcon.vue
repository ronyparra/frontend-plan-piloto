<template>
  <c-btn
    elevation="2"
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
    disabled: {
      type: Boolean
    }
  }
}
</script>

