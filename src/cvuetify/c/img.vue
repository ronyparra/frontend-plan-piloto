<template>
  <v-img :max-width="maxWidth" :src="src"></v-img>
</template>
<script>
export default {
  props: {
    "max-width": [String, Number],
    src: String,
  },
};
</script>
