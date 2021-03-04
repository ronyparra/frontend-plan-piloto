<template>
  <v-container>
    <v-row dense>
      <div class="ml-3   subtitle-1 font-weight-medium">Top Conceptos</div>
      <v-col cols="12" v-for="n in 5" :key="n">
        <v-card color="white" class="rounded-xl" elevation="0">
          <v-container class="caption d-flex flex-row justify-space-between">
            <div class="d-flex flex-column">
              <div class="caption  grey--text">Concepto</div>
              <div class="caption  font-weight-black">Servicio</div>
            </div>
     
            <div class="d-flex flex-column align-end">
              <div class="caption  grey--text">Beneficios</div>
              <div class="caption  font-weight-black">Gs 35.666.777</div>
            </div>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>