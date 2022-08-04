<template>
    <v-chip :color="color" :dark="dark"><slot /></v-chip>
</template>
<script>
export default {
  props: {
    color: String,
    dark: Boolean
  }
}
</script>
