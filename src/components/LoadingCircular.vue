<template>
  <c-overlay :value="value" :opacity="1">
    <c-progress-circular
      indeterminate
      color="primary"
      :size="50"
      :width="10"
    ></c-progress-circular>
  </c-overlay>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
