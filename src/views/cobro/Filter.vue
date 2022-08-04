<template>
  <c-card flat >
      <v-form ref="form" class="my-2 d-flex align-center">
        <v-row dense>
          <v-col cols="12" sm="4" md="2" >
            <AutocompleteCliente
              label=""
              clearable
              placeholder="Cliente"
              :rules="[]"
              @change="form.idsucursal = undefined"
              v-model="form.idcliente"
            />
          </v-col>
          <v-col cols="12" sm="4" md="2" >
            <AutocompleteUsuario
              label=""
              clearable
              placeholder="Cobrado por"
              :rules="[]"
              v-model="form.idusuario"
            />
          </v-col>
          <v-col cols="12" sm="4" md="2" >
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
  </c-card>
</template>
<script>
import TextDate from '@/components/TextDate'
import AutocompleteCliente from '../cliente/Autocomplete'
import AutocompleteEstadoCobro from '../estadocobro/Autocomplete'
import AutocompleteUsuario from '../usuario/Autocomplete'
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    value: Array
  },
  components: {
    TextDate,
    AutocompleteUsuario,
    AutocompleteCliente,
    AutocompleteEstadoCobro
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
    ...mapGetters('cobro', ['getParams'])
  },
  methods: {
    ...mapActions('cobro', ['fetchCobro', 'setParams']),

    filtrar () {
      if (!this.$refs.form.validate()) return null
      this.fetchCobro(this.form)
      this.setParams(this.form)
    }
  },
  data: () => ({
    form: {
      idcliente: '',
      idusuario: '',
      idsucursal: '',
      fechadesde: '',
      fechahasta: '',
      idestadocobro: ''
    }
  })
}
</script>
