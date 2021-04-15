<template>
  <div>
    <c-row dense>
      <c-col cols="12">
        <div>
          <c-container class="mb-n3 d-flex flex-row justify-space-between">
            <div class="caption ">Cliente</div>
            <div class="caption  ">Resumen</div>
          </c-container>
        </div>
      </c-col>
      <c-col cols="12" v-for="(n, i) in getCliente" :key="i">
        <c-card color="white" class="rounded-xl" elevation="0">
          <c-container class="caption d-flex flex-row justify-space-between">
            <div class="d-flex flex-column align-center justify-center">
              <div class="caption ">{{ n.cliente }}</div>
            </div>
            <div class="d-flex flex-column align-end">
              <div class="caption">{{ n.cant_actividad }} Actividades</div>
              <div v-for="(d, y) in n.detalle" :key="y">
                <div class="caption  font-weight-black">
                  {{ d.moneda }} {{ formatNumber(d.saldo) }}
                </div>
              </div>
            </div>
          </c-container>
        </c-card>
      </c-col>
    </c-row>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { currencyFormatter } from '../../util/number.util';
export default {
  mounted() {
    this.fetchCliente();
  },
  computed: {
    ...mapGetters("analytics", ["getCliente"]),
  },
  methods: {
    ...mapActions("analytics", ["fetchCliente"]),
    formatNumber:(value)=>currencyFormatter(value)
  },
};
</script>
