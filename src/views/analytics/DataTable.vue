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
            <div class="caption" v-for="(item, i) in headers" :key="i">
              {{ item.title }} <Sortable v-if="item.sortable" v-model="asc" />
            </div>
          </c-container>
        </div>
      </c-col>

      <c-col cols="12" v-for="(n, i) in itemsFormated" :key="i">
        <c-card color="white" class="rounded-xl" elevation="0">
          <c-container class="caption d-flex flex-row justify-space-between">
            <div class="d-flex flex-column align-center justify-center">
              <div class="caption font-weight-medium ">{{ n[itemBody.title] }}</div>
            </div>
            <div class="d-flex flex-column align-end">
              <div class="caption">{{ n[itemBody.detCant] }} {{itemBody.detTitle}}</div>
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
import AutocompleteMoneda from "../moneda/Autocomplete";
import { currencyFormatter } from "../../util/number.util";
import Sortable from "./Sortable";
export default {
  components: {
    Sortable,
     AutocompleteMoneda,
  },
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    itemBody: {
        type: Object,
        default: () =>  {}
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    orderBy: 1,
    asc: true,
  }),

  computed: {
    itemsFormated() {
      const itemsRaw = this.items;
      if (!this.orderBy) return itemsRaw;
      return itemsRaw.sort((a, b) => {
        const result1 = a.detalle.find(
          ({ idmoneda }) => idmoneda === this.orderBy
        );
        const result2 = b.detalle.find(
          ({ idmoneda }) => idmoneda === this.orderBy
        );
        return result1?.saldo > result2?.saldo
          ? this.asc
            ? -1
            : 1
          : result1?.saldo < result2?.saldo
          ? this.asc
            ? 1
            : -1
          : 0;
      });
    },
  },
  methods:{
       formatNumber: (value) => currencyFormatter(value),
  }
};
</script>