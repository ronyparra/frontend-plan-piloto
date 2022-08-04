<template>
  <c-card flat>
      <v-form ref="form" class="my-2 d-flex align-center">
        <v-row dense>
          <v-col cols="12" sm="4" md="2">
            <AutocompleteCliente
              label=""
              clearable
              placeholder="Cliente"
              :rules="[]"
              @change="form.idsucursal = undefined"
              v-model="form.idcliente"
            />
          </v-col>
          <v-col cols="12" sm="4" md="2">
            <AutocompleteClienteSucursal
              label=""
              placeholder="Sucursal"
              :rules="[]"
              clearable

              :idcliente="form.idcliente"
              v-model="form.idsucursal"
            />
          </v-col>
          <v-col cols="12" sm="4" md="2">
            <AutocompleteEstadoCobro
              label=""
              clearable
              placeholder="Estado de Cobro"
              :rules="[]"
              v-model="form.idestadocobro"
            />
          </v-col>
          <v-col cols="12" sm="4" md="2" >
            <TextDate
              placeholder="Filtrar Desde"
              v-model="form.fechadesde"
            />
          </v-col>
          <v-col cols="9" sm="4" md="2" >
            <TextDate
              placeholder="Filtrar Hasta"
              v-model="form.fechahasta"
            />
          </v-col>

          <v-spacer></v-spacer>
          <v-btn text color="blue" class=" text-capitalize" @click="filtrar()"
            >Filtrar</v-btn
          >
        </v-row>
      </v-form>
      <v-divider></v-divider>
      <Opciones :value="value" @fetch="$emit('fetch')" @pdf="$emit('pdf')" />
  </c-card>
</template>
<script>
import TextDate from '@/components/TextDate'
import AutocompleteCliente from '../cliente/Autocomplete'
import AutocompleteEstadoCobro from '../estadocobro/Autocomplete'
import AutocompleteClienteSucursal from '../cliente/AutocompleteSucursal'
import { mapActions, mapGetters } from 'vuex'
import Opciones from './Opciones'
export default {
  props: {
    value: Array
  },
  components: {
    Opciones,
    TextDate,
    AutocompleteCliente,
    AutocompleteEstadoCobro,
    AutocompleteClienteSucursal
  },
  created () {
    this.form = JSON.parse(JSON.stringify(this.getParams))
  },
  watch: {
    getParams () {
      this.form = JSON.parse(JSON.stringify(this.getParams))
    }
  },
  computed: {
    ...mapGetters('actividad', ['getParams'])
  },
  methods: {
    ...mapActions('actividad', ['fetchActividad', 'setParams']),

    filtrar () {
      if (!this.$refs.form.validate()) return null
      this.fetchActividad(this.form)
      this.setParams(this.form)
    }
  },
  data: () => ({
    form: {
      idcliente: '',
      idsucursal: '',
      fechadesde: '',
      fechahasta: '',
      idestadocobro: 1
    }
  })
}
</script>
