<template>
  <c-autocomplete
    :value="value"
    ref="input"
    :items="items"
    :loading="loading"
    :item-value="itemValue"
    :rules="rules"
    :return-object="returnObject"
    :item-text="itemText"
    :label="label"
    :multiple="multiple"
    :chips="chips"
    :small-chips="chips"
    filled
    dense
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
  </c-autocomplete>
</template>
<script>
export default {
  props: {
    value: [String, Number, Object, Array],
    items: Array,
    loading: Boolean,
    itemValue: String,
    label: String,
    itemText: String,
    multiple: Boolean,
    chips: Boolean,
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
