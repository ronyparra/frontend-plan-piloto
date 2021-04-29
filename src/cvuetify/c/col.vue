<template>
  <v-col :cols="cols" :md="md" :sm="sm" :lg="lg"><slot /></v-col>
</template>
<script>
export default {
  props: {
    cols: [String,Number],
    sm: [String,Number],
    md: [String,Number],
    lg: [String,Number],
  },
};
</script>
