<template>
  <v-list-item :two-line="twoLine"><slot /></v-list-item>
</template>
<script>
export default {
  props:{
    'two-line':{
      type: Boolean,
      default: false
    }
  }
};
</script>
