<template>
  <v-card :color="color" :active-class="activeClass" :width="width" :flat="flat" :to="to"><slot /></v-card>
</template>
<script>
export default {
  props: {
    width: [String, Number],
    color: String,
    to: String,
    'active-class': String,
    flat: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
