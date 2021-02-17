<template>
  <v-list-item :two-line="twoLine" :to="to" @click="$emit('click')"><slot /></v-list-item>
</template>
<script>
export default {
  props:{
    'two-line':{
      type: Boolean,
      default: false
    },
    to: String
  }
};
</script>
