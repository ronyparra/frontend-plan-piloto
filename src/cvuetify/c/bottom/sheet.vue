<template>
  <v-bottom-sheet :value="value" @input="'input', $event"
    ><slot
  /></v-bottom-sheet>
</template>
<script>
export default {
  props: {
    value: Boolean,
  },
};
</script>
