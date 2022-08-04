<template>
  <div>
    <v-row dense>
      <v-col cols="6" sm="3" v-for="(n, i) in getPendienteActual" :key="i">
        <c-card
          :color="n.color || 'white'"
          class="rounded-xl pa-1"
          elevation="0"
        >
          <v-container>
            <div class="caption  grey--text mb-1">{{ n.tipo }}</div>
            <div class="caption">
              {{ n.terminado}}/{{ n.registrado }} Terminado
            </div>
            <div class="caption font-weight-thin">
              {{ getPorcentaje(n.terminado, n.registrado) }}% Efectividad
            </div>
          </v-container>
        </c-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { currencyFormatter } from '../../util/number.util'
export default {
  data: () => ({}),
  mounted () {
    this.fetchPendiente()
  },
  computed: {
    ...mapGetters('analytics', ['getPendiente']),
    getPendienteActual () {
      return this.getPendiente.length === 2 ? this.getPendiente[1].data : []
    }
  },
  methods: {
    ...mapActions('analytics', ['fetchPendiente']),

    getPorcentaje (ter, reg) {
      const result = (ter * 100) / reg
      return currencyFormatter(Number.isNaN(result) ? 0 : result)
    }
  }
}
</script>
