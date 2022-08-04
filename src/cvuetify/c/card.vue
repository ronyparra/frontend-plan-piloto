<template>
  <v-card :color="color" :active-class="activeClass" :width="width"  :elevation="elevation" :flat="flat" :to="to"><slot /></v-card>
</template>
<script>
export default {
  props: {
    width: [String, Number],
    elevation: String,
    color: String,
    to: String,
    'active-class': String,
    flat: {
      type: Boolean,
      default: false
    }
  }
}
</script>
