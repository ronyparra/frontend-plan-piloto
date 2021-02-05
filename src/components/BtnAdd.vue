<template>
  <c-btn
    elevation="2"
    fab
    :x-small="xSmall"
    :small="!xSmall"
    dark
    color="primary"
    :to="to"
    @click="$emit('click')"
    ><c-icon>add</c-icon></c-btn
  >
</template>
<script>
export default {
  props: {
    to: String,
    "x-small": {
      type: Boolean,
      default: true,
    },
  },
};
</script>
