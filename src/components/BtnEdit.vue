<template>
  <c-btn
    color="primary"
    elevation="2"
    fab
    :text="text"
    x-small
    @click="$emit('click')"
  >
    <c-icon>
      edit
    </c-icon>
  </c-btn>
</template>
<script>
export default {
  props: {
    text: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
