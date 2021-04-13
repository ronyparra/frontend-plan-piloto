<template>
  <v-container class="fill-height d-flex flex-column justify-space-between">
    <div>
      <div class="ml-2 mb-4   subtitle-1 font-weight-medium">
        Filtros de Analytics
      </div>
      <v-row dense>
        <v-col cols="12">
          <TextDate label="Filtrar Desde" v-model="params.desde" />
        </v-col>
        <v-col cols="12">
          <TextDate label="Filtrar Hasta" v-model="params.hasta" />
        </v-col>
      </v-row>
    </div>
    <v-container>
      <v-btn block rounded color="primary" @click="changeParams(params)">Filtrar</v-btn>
    </v-container>
  </v-container>
</template>
<script>
import TextDate from "@/components/TextDate";
import { first_date_month, last_date_month } from "@/util/date.util";
import { mapActions } from 'vuex';
export default {
  components: {
    TextDate,
  },
  data: () => ({
    params: {
      desde: first_date_month(),
      hasta: last_date_month(),
    },
  }),
  methods:{
    ...mapActions('analytics',['changeParams'])
  }
};
</script>
