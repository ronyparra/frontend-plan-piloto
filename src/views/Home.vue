<template>
  <div class="title">
    <c-app-bar flat></c-app-bar>
    Hola, <span class="font-weight-black">{{ getUserInfo.nombre }}</span>
    <v-row dense>
      <v-col cols="12" sm="4">
        <v-card color="#385F73" dark>
          <v-card-subtitle
            >Listen to your favorite artists and albums whenever
          </v-card-subtitle>

          <v-card-actions>
            <v-btn text>
              Listen Now
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card color="#385F73" dark>
          <v-card-subtitle
            >Listen to your favorite artists and albums whenever
          </v-card-subtitle>

          <v-card-actions>
            <v-btn text>
              Listen Now
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card color="#385F73" dark>
          <v-card-subtitle
            >Listen to your favorite artists and albums whenever
          </v-card-subtitle>

          <v-card-actions>
            <v-btn text>
              Listen Now
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("auth", ["getUserInfo"]),
  },
};
</script>
