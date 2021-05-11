<template>
  <v-autocomplete
    :value="value"
    ref="input"
    :items="items"
    :loading="loading"
    :item-value="itemValue"
    :rules="rules"
    :placeholder="placeholder"
    :return-object="returnObject"
    :item-text="itemText"
    :label="label"
    :multiple="multiple"
    :chips="chips"
    :small-chips="chips"
    :readonly="readonly"
    :clearable="clearable"
    :filled="filled"
    :dense="dense"
    :suffix="suffix"
    :prefix="prefix"
    flat
    rounded
    background-color="grey lighten-4"
    @input="$emit('input', $event)"
    @change="$emit('change')"
  >
    <template v-slot:no-data v-if="to">
      <c-list-item @click="toRoute()">
        <c-list-item-content>
          <c-list-item-title
            >No existe concidencia. Click para agregar</c-list-item-title
          >
        </c-list-item-content>
      </c-list-item>
    </template>
  </v-autocomplete>
</template>
<script>
export default {
  props: {
    value: [String, Number, Object, Array],
    items: Array,
    loading: Boolean,
    suffix: String,
    prefix: String,
    itemValue: String,
    label: String,
    itemText: String,
    multiple: Boolean,
    chips: Boolean,
    clearable: Boolean,
    readonly: Boolean,
    placeholder: String,
    filled: {
      type: Boolean,
      default: true,
    },
    dense: {
      type: Boolean,
      default: true,
    },
    rules: {
      type: Array,
      default: function() {
        return this.validator;
      },
    },
    returnObject: {
      type: Boolean,
      default: false,
    },
    to: String,
    redirect: String,
  },
  computed: {
    validator: (vm) => {
      if (vm.multiple) return [(v) => v.length > 0 || "Obligatorio"];
      return vm.returnObject
        ? [(v) => !!v[vm.itemValue] || "Obligatorio"]
        : [(v) => !!v || "Obligatorio"];
    },
  },
  methods: {
    toRoute() {
      this.$router.push({
        path: this.to,
        query: {
          redirect: this.redirect,
        },
      });
    },
    focus: (vm) => vm.$refs.input.focus(),
    isMenuActive: (vm) => vm.$refs.input.isMenuActive(),
  },
};
</script>
