<template>
  <v-container class="fill-height d-flex flex-column justify-space-between">
    <div>
    <div class="ml-2 mb-4   subtitle-1 font-weight-medium">
      Filtros de Analytics
    </div>
    <v-row dense >
      <v-col cols="12">
        <TextDate label="Filtrar Desde" v-model="params.desde" />
      </v-col>
      <v-col cols="12">
        <TextDate label="Filtrar Hasta" v-model="params.hasta" />
      </v-col>
    </v-row>
    </div>
    <v-container>
    <v-btn block rounded color="primary">Filtrar</v-btn>
    </v-container>
  </v-container>
</template>
<script>
import TextDate from "@/components/TextDate";
import { current_date } from "@/util/date.util";
export default {
  components:{
    TextDate
  },
  data: () => ({
    params:{
      desde: current_date(),
      hasta: current_date()
    }
  }),
};
</script>
