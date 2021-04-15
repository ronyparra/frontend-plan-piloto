<template>
  <div>
    <c-row dense class="mb-n5 d-flex justify-end">
      <c-col cols="12" sm="3">
        <AutocompleteMoneda
          v-model="orderBy"
          :filled="false"
          label="Ordenar por"
          :rules="[]"
        />
      </c-col>
    </c-row>
    <c-row dense>
      <c-col cols="12">
        <div>
          <c-container class="mb-n3 d-flex flex-row justify-space-between">
            <div class="caption ">Cliente</div>
            <div class="caption">Resumen <c-icon v-if="orderBy"  small @click="asc = !asc">{{asc ? 'north' : 'arrow_downward'}}</c-icon></div>
          </c-container>
        </div>
      </c-col>

      <c-col cols="12" v-for="(n, i) in getClienteWithOrder" :key="i">
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
import { currencyFormatter } from "../../util/number.util";
import AutocompleteMoneda from "../moneda/Autocomplete";
export default {
  data: () => ({
    orderBy: null,
    asc: true
  }),
  components: {
    AutocompleteMoneda,
  },
  mounted() {
    this.fetchCliente();
  },

  computed: {
    ...mapGetters("analytics", ["getCliente"]),
    getClienteWithOrder() {
      const report = this.getCliente;
      if(!this.orderBy) return report
      return report.sort((a, b) => {
        const result1 = a.detalle.find(
          ({ idmoneda }) => idmoneda === this.orderBy
        );
        const result2 = b.detalle.find(
          ({ idmoneda }) => idmoneda === this.orderBy
        );
        return result1.saldo > result2.saldo
          ? ( this.asc ? -1 : 1)
          : result1.saldo < result2.saldo
          ? ( this.asc ? 1 : -1 )
          : 0;
      });
    },
  },
  methods: {
    ...mapActions("analytics", ["fetchCliente"]),
    formatNumber: (value) => currencyFormatter(value),
  },
};
</script>
