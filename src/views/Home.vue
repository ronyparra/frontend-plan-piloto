<template>
  <div>
    <AppBar @click:drawer="drawer = !drawer" />
    <NavBar v-model="drawer" />
    <div class="title">
      Hola, <span class="font-weight-black">{{ getUserInfo.nombre }}</span>
      <v-row dense>
        <v-col cols="12">
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
        <v-col cols="12">
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
        <v-col cols="12">
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
  </div>
</template>

<script>
import AppBar from "./layout/main/AppBar";
import NavBar from "./layout/main/NavBar";
import { mapGetters } from "vuex";
export default {
  components: {
    AppBar,
    NavBar
  },
  computed: {
    ...mapGetters("auth", ["getUserInfo"]),
  },
  data: () => ({
    drawer: false,
  }),
};
</script>
