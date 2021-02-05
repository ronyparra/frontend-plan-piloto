<template>
  <v-list-item-group :active-class="activeClass"><slot /></v-list-item-group>
</template>
<script>
export default {
  props: {
    "active-class": String,
  },
};
</script>
