<template>
  <div>
    <InputAutocomplete
      :label="label"
      item-value="idcarpeta"
      item-text="descripcion"
      ref="input"
      :suffix="suffix"
      :prefix="prefix"
      :value="value"
      :items="getFolder"
      :loading="isLoading"
      :placeholder="placeholder"
      :clearable="clearable"
      :rules="rules"
      :filled="filled"
      :readonly="readonly"
      :dense="dense"
      :return-object="returnObject"
      @input="$emit('input', $event)"
      @change="$emit('change')"
      :to="to"
      :redirect="redirect"
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
    value: [Number, Object, String],
    rules: Array,
    returnObject: Boolean,
    clearable: Boolean,
    readonly: Boolean,
    suffix: String,
    prefix: String,
    filled: {
      type: Boolean,
      default: true
    },
    dense: {
      type: Boolean,
      default: true
    },
    redirect: String,
    placeholder: String,
    label: {
      type: String,
      default: 'Carpeta'
    },
    to: {
      type: String,
      default: '/folder/add'
    }
  },
  mounted () {
    this.fetchFolder()
  },
  computed: {
    ...mapGetters('folder', ['getFolder', 'isLoading'])
  },
  methods: {
    ...mapActions('folder', ['fetchFolder']),
    focus: (vm) => vm.$refs.input.focus(),
    isMenuActive: (vm) => vm.$refs.input.isMenuActive()
  }
}
</script>
