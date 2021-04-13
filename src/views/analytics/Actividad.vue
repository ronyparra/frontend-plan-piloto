<template>
<v-container filled>
  <div class="ml-2 mb-4  subtitle-1 font-weight-medium">Saldos de Actividades</div>
  <v-row dense >
    
    <v-col cols="6" sm="3" v-for="(n,i) in getActividad" :key="i">
      <v-card :color="n.color || 'white'" class="rounded-xl pa-1" elevation="0">
        <v-container >
          <div class="caption  grey--text">{{n.title}}</div>

          <div class="caption ml-1 font-weight-black d-flex space-between" v-for="(j,y) in n.detalle" :key="y">{{j.moneda}} {{formatNumber(j.saldo)}}</div>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import {currencyFormatter } from "@/util/number.util";
export default {
    data:()=>({}),
    mounted(){
      this.fetchActividad();
    },
    computed:{
      ...mapGetters('analytics',['getActividad'])
    },
    methods:{
      ...mapActions('analytics',['fetchActividad']),
      formatNumber:(value)=>currencyFormatter(value)
    }
};
</script>
