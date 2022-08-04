<template>
  <v-text-field
    :color="color"
    outlined
    rounded
    autocomplete="off"
    :type="type"
    :solo="solo"
    :value="value"
    :dense="dense"
    :rules="rules"
    :prepend-inner-icon="prependInnerIcon"
    :append-icon="appendIcon"
    :label="label"
    :messages="messages"
    :flat="flat"
    :readonly="readonly"
    :filled="filled"
    :placeholder="placeholder"
    :background-color="backgroundColor"
    :hide-details="hideDetails"
    @click:append="$emit('click:append')"
    @input="$emit('input', $event)"
  ></v-text-field>
</template>
<script>
export default {
  props: {
    value: [String, Number],
    messages: String,
    color: {
      type: String,
      default: 'primary'
    },
    flat: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    solo: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    },
    filled: {
      type: Boolean,
      default: false
    },
    rules: {
      type: [Array],
      default: () => [(v) => !!v || 'Obligatorio']
    },
    readonly: Boolean,
    label: String,
    placeholder: String,
    'prepend-inner-icon': String,
    'append-icon': String,
    'background-color': String,
    'hide-details': {
      type: Boolean,
      default: true
    }
  }
}
</script>
