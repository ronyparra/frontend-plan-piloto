<template>
  <c-btn color="primary" elevation="2" fab :disabled="disabled"  :text="text" x-small @click="$emit('click')">
    <c-icon>
      delete
    </c-icon>
  </c-btn>
</template>
<script>
export default {
  props:{
    text: {
      type: Boolean,
      default: true
    },
    disabled: Boolean
  }
};
</script>
