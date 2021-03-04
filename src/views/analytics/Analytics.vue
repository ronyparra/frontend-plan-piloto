<template>
  <div class="fill-height">
    <c-app-bar app flat style="z-index: -3"></c-app-bar>
    <div class="title fill-height">
      <v-card outlined class="fill-height d-flex flex-row">
        <v-tabs vertical>
          <v-tab to="/analytics/actividad">
            <v-icon>
              assignment
            </v-icon>
          </v-tab>
          <v-tab to="/analytics/pendiente">
            <v-icon>
              query_builder
            </v-icon>
          </v-tab>
          <v-tab to="/analytics/cliente">
            <v-icon>
              account_box
            </v-icon>
          </v-tab>
          <v-tab to="/analytics/concepto">
            <v-icon>
              add_shopping_cart
            </v-icon>
          </v-tab>
          <v-tabs-items vertical class="fill-height">
            <v-card color="blue-grey lighten-5" class="fill-height">
              <transition>
                <router-view></router-view>
              </transition>
            </v-card>
          </v-tabs-items>
        </v-tabs>
      </v-card>
    </div>
  </div>
</template>
<style lang="css" scoped>
.v-tab {
  min-width: 50px;
}
</style>
