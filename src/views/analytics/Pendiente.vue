<template>
  <v-container>
         <div class="ml-3   subtitle-1 font-weight-medium">
        Rendimiento en pendientes
      </div>
    <v-row dense>
   
      <v-col cols="6" sm="3" v-for="(n, i) in pendiente" :key="i">
        <v-card
          :color="n.color || 'white'"
          class="rounded-xl pa-1"
          elevation="0"
        >
          <v-container>
            <div class="caption  grey--text mb-1">{{ n.title }}</div>
            <div class="caption">{{ n.terminada }}/{{n.regitrada}} Terminado</div>
            <div class="caption font-weight-thin">{{getPorcentaje(n.terminada,n.regitrada) }}% Efectividad</div>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    pendiente: [
      {
        title: "Servicios",
        regitrada: 5,
        terminada: 4,
      },
      {
        title: "Presupuestos",
        regitrada: 5,
        terminada: 4,
      },
      {
        title: "Compras",
        regitrada: 5,
        terminada: 4,
      },
      {
        title: "Relevamientos",
        regitrada: 5,
        terminada: 4,
      },
    ],
  }),
  methods:{
      getPorcentaje(ter,reg){
          return ter * 100 /reg;
      }
  }
};
</script>
