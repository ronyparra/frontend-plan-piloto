<template>
  <v-form ref="form" @submit.prevent="$emit('@submit.prevent')"><slot /></v-form>
</template>
<script>
export default {
  methods: {
    validate() {
      return this.$refs.form.validate();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
