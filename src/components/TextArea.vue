<template>
  <c-textarea :value="value" :label="label" :readonly="readonly" filled dense rounded @input="$emit('input', $event)"></c-textarea>
</template>
<script>
export default {
  props: {
    value: String,
    label: String,
    readonly: Boolean,
    
  },
};
</script>
