<template>
  <v-menu
    ref="menu1"
    v-model="menu1"
    :disabled="readonly"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="value"
        :label="label"
        append-icon="calendar_today"
        readonly
        :rules="rules"
        outlined
        :dense="dense"
        :placeholder="placeholder"
        flat
        rounded
        hide-details
        v-bind="attrs"
        v-on="on"
        @blur="date = parseDate(value)"
        @input="$emit('input', $event)"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" no-title scrollable @input="menu1 = false">
    </v-date-picker>
  </v-menu>
</template>
<script>
import { formatDate, parseDate } from '@/util/date.util'
export default {
  props: {
    value: String,
    label: String,
    placeholder: String,
    readonly: Boolean,
    rules: {
      type: [Array],
      default: () => [(v) => !!v || 'Obligatorio']
    },
    dense: {
      type: Boolean,
      default: true
    },
    filled: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    this.date = this.parseDate(this.value)
  },
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu1: false
  }),
  watch: {
    date () {
      this.$emit('input', formatDate(this.date))
    }
  },
  methods: {
    parseDate (date) {
      return parseDate(date)
    }
  }
}
</script>
