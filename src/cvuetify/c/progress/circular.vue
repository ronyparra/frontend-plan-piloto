<template>
  <v-progress-circular
    :indeterminate="indeterminate"
    :color="color"
    :width="width"
    :size="size"
  ></v-progress-circular>
</template>
<script>
export default {
  props: {
    color: String,
    width: Number,
    size: Number,
    indeterminate: {
      type: Boolean,
      default: false
    }
  }
}
</script>
