<template>
  <div>
    <InputAutocomplete
      :label="label"
      item-value="idusuario"
      item-text="nombre"
      ref="input"
      :value="value"
      :items="getUsuario"
      :clearable="clearable"
      :loading="isLoading"
      :rules="rules"
      :placeholder="placeholder"
      :readonly="readonly"
      :return-object="returnObject"
      :multiple="multiple"
      @input="$emit('input', $event)"
      @change="$emit('change')"
    />
  </div>
</template>

<script>
import InputAutocomplete from '@/components/InputAutocomplete'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    InputAutocomplete
  },
  props: {
    value: [Number, Object, Array],
    rules: Array,
    returnObject: Boolean,
    label: {
      type: String,
      default: 'Tecnico'
    },
    clearable: Boolean,
    readonly: Boolean,
    placeholder: String,
    multiple: Boolean
  },
  mounted () {
    this.fetchUsuario()
  },
  computed: {
    ...mapGetters('usuario', ['getUsuario', 'isLoading'])
  },
  methods: {
    ...mapActions('usuario', ['fetchUsuario']),
    focus: (vm) => vm.$refs.input.focus(),
    isMenuActive: (vm) => vm.$refs.input.isMenuActive()
  }
}
</script>

<style></style>
