<template>
  <c-icon class="mb-1" x-small :color="activeFilter" @click="$emit('click'), $emit('input',!value)">{{
   activeFilter ? (value ? "north" : "arrow_downward") : 'circle'
  }}</c-icon>
</template>
<script>
export default {
  props: {
    value: Boolean,
    activeClass: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    activeFilter () {
      if (this.activeClass) return 'red'
      return undefined
    }
  }
}
</script>
