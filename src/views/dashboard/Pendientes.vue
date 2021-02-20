<template>
  <c-row dense>
    <c-col cols="12" sm="4" v-for="(item, i) of getDashboard" :key="i">
      <v-expansion-panels accordion v-if="pendiente(item.detalle)">
        <v-expansion-panel>
          <v-expansion-panel-header hide-actions class="d-flex flex-column" >
            <v-progress-linear
              value="100"
              height="3"
              :color="item.color"
            ></v-progress-linear>
            <v-card class="d-flex flex-row" width="100%" flat>
              <div class="align-self-center mx-4">
                <v-icon x-large>{{ item.icon }}</v-icon>
              </div>
              <v-divider vertical class="my-3"></v-divider>
              <div>
                <v-card-subtitle> {{ item.tipo }} </v-card-subtitle>
                <v-card-text
                  >Hay {{ pendiente(item.detalle) }}
                  {{
                    pendiente(item.detalle) > 1 ? "pendientes" : "pendiente"
                  }}</v-card-text
                >
              </div>
              <v-spacer></v-spacer>
              <div class="align-self-center mr-4">
                <v-icon>keyboard_arrow_down</v-icon>
              </div>
            </v-card>
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-item-group>
                <v-list-item
                  v-for="(list, j) in item.detalle"
                  :key="j"
                  :to="'/pendiente/edit/' + list.idpendiente"
                >
                  <v-list-item-icon>
                    <v-icon>keyboard_arrow_right</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-subtitle
                      v-text="list.descripcion"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </c-col>
  </c-row>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  mounted() {
    this.fetchDashboard();
  },
  computed: {
    ...mapGetters("pendiente", ["getDashboard", "isLoading"]),
  },
  methods: {
    ...mapActions("pendiente", ["fetchDashboard"]),
    pendiente(detalle) {
      if (!detalle) return null;
      return detalle.length;
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .v-expansion-panel-header {
  padding: 0px 0px;
}
::v-deep .v-expansion-panel-content__wrap {
  padding: 0 2px 2px;
  flex: 1 1 auto;
  max-width: 100%;
}
</style>
