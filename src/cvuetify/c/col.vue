<template>
  <v-col :cols="cols" :md="md" :sm="sm" :lg="lg"><slot /></v-col>
</template>
<script>
export default {
  props: {
    cols: String,
    sm: String,
    md: String,
    lg: String,
  },
};
</script>
