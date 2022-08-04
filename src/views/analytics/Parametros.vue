<template>
  <div class="fill-height d-flex flex-column justify-space-between">
    <div>
      <div class="ml-2 mb-4   subtitle-1 font-weight-medium">
        Filtros de Analytics
      </div>
      <v-row dense>
        <v-col cols="12" sm="6">
          <TextDate label="Filtrar Desde" v-model="params.desde" />
        </v-col>
        <v-col cols="12" sm="6">
          <TextDate label="Filtrar Hasta" v-model="params.hasta" />
        </v-col>
      </v-row>
    </div>
    <v-container>
      <v-btn block rounded color="primary" @click="changeParams(params)"
        >Filtrar</v-btn
      >
    </v-container>
  </div>
</template>
<script>
import TextDate from '@/components/TextDate'
import { firstDateMonth, lastDateMonth } from '@/util/date.util'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    TextDate
  },
  data: () => ({
    params: {
      desde: firstDateMonth(),
      hasta: lastDateMonth()
    }
  }),
  created () {
    this.params = JSON.parse(JSON.stringify(this.getParams))
  },
  computed: {
    ...mapGetters('analytics', ['getParams'])
  },
  methods: {
    ...mapActions('analytics', ['changeParams'])
  }
}
</script>
