<template>
  <v-btn
    elevation="2"
    fab
    x-small
    :to="to"
    text
    plain
    color="primary"
    ><c-icon>clear</c-icon></v-btn
  >
</template>
<script>
export default {
  props: {
    to: String
  }
}
</script>
