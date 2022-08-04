<template>
  <c-text-field
    :value="value"
    background-color="grey lighten-4"
    rounded
    dense
    placeholder="Buscar"
    hide-details
    append-icon="search"
    @input="$emit('input', $event)"
  ></c-text-field>
</template>
<script>
export default {
  props: {
    value: String
  }
}
</script>
