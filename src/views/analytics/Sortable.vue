<template>
  <c-icon small @click="$emit('input',!value)">{{
    value ? "north" : "arrow_downward"
  }}</c-icon>
</template>
<script>
export default {
  props: {
    value: Boolean,
  }
};
</script>
