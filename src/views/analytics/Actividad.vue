<template>
 <div>
    <c-row dense>
      <c-col cols="6" sm="3" v-for="(n, i) in getActividad" :key="i">
        <c-card
          :color="n.color || 'white'"
          class="rounded-xl pa-1"
          elevation="0"
        >
          <c-container>
            <div class="caption mb-1 grey--text">{{ n.title }}</div>

            <div
              class="caption ml-1 font-weight-black d-flex justify-space-between"
              v-for="(j, y) in n.detalle"
              :key="y"
            >
              <div>{{ j.moneda }}</div>
              <div>{{ formatNumber(j.saldo) }}</div>
            </div>
          </c-container>
        </c-card>
      </c-col>
    </c-row>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { currencyFormatter } from "@/util/number.util";
export default {
  data: () => ({}),
  mounted() {
    this.fetchActividad();
  },
  computed: {
    ...mapGetters("analytics", ["getActividad"]),
  },
  methods: {
    ...mapActions("analytics", ["fetchActividad"]),
    formatNumber: (value) => currencyFormatter(value),
  },
};
</script>
