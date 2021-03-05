<template>
  <v-container>
    <v-row dense>
      <div class="ml-3   subtitle-1 font-weight-medium">Top Clientes</div>
      <v-col cols="12">
        <div>
          <v-container class="mb-n3 d-flex flex-row justify-space-between">
            <div class="caption ">Cliente</div>
            <div class="caption  ">Actividades</div>
            <div class="caption  ">Saldo</div>
          </v-container>
        </div>
      </v-col>
      <v-col cols="12" v-for="n in 5" :key="n">
        <v-card color="white" class="rounded-xl" elevation="0">
          <v-container class="caption d-flex flex-row justify-space-between">
            <div class="d-flex flex-column">
              <div class="caption  grey--text">Transagro</div>
            </div>
            <div class="d-flex flex-column align-center">
              <div class="caption  grey--text">10</div>
            </div>
            <div class="d-flex flex-column align-end">
              <div class="caption  font-weight-black">Gs 35.666.777</div>
            </div>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
