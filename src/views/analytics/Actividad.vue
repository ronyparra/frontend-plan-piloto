<template>
<v-container filled>
  <div class="ml-3   subtitle-1 font-weight-medium">Saldos de Actividades</div>
  <v-row dense >
    
    <v-col cols="6" sm="3" v-for="(n,i) in actividad" :key="i">
      <v-card :color="n.color || 'white'" class="rounded-xl pa-1" elevation="0">
        <v-container>
          <div class="caption  grey--text">{{n.title}}</div>
          <div class="caption ml-1 font-weight-black">Gs {{n.saldo}}</div>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
  </v-container>
</template>
<script>
export default {
    data:()=>({
        actividad:[
            {
                title: 'Periodo Anterior',
                saldo: '1,231,321',
                color: "pink lighten-5"
            },
            {
                title: 'Periodo Actual',
                saldo: '1,231,321'
            },
            {
                title: 'Cobrado',
                saldo: '1,231,321'
            },
            {
                title: 'Por Cobrar',
                saldo: '1,231,321'
            }
        ]
    })
};
</script>
