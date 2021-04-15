<template>
  <div>
    <c-row dense style="max-height: 74vh" class="mt-1 overflow-y-auto">
      <c-col cols="12">
        <table style="width:100%">
          <tr>
            <th :class="item.headClass" v-for="(item, i) in heads" :key="i">
              {{ item.title }}
              <Sortable
                v-if="item.sortable != undefined"
                v-model="item.sortable"
                @click="filterItems(item.value, item.sortable)"
              />
            </th>
          </tr>
          <tr
            v-for="(item, i) in itemsFormated"
            :key="i"
            style="background-color: white"
            class="rounded-xl my-1"
          >
            <td :class="head.class" v-for="(head, j) in headers" :key="j">
              {{
                head.number ? formatNumber(item[head.value]) : item[head.value]
              }}
            </td>
          </tr>
        </table>
      </c-col>
    </c-row>
  </div>
</template>
<script>
import { currencyFormatter } from "../../util/number.util";
import Sortable from "./Sortable";
export default {
  components: {
    Sortable,
  },
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    filter: String
  },
  data: () => ({
    heads: [],
    itemsFormated: [],
    asc: true,
  }),
  mounted() {
    this.heads = JSON.parse(JSON.stringify(this.headers));
    this.itemsFormated = JSON.parse(JSON.stringify(this.items));
    this.filterItems();
  },
  watch:{
    items(val){
      this.itemsFormated = JSON.parse(JSON.stringify(val));
      this.filterItems();
    }
  },
  methods: {
    formatNumber: (value) => currencyFormatter(value),
    filterItems(filter,order){
      if(!filter && order === undefined) {
        filter = this.filter;
        order = false;
      }
      return this.itemsFormated.sort((a, b) => {
        return a[filter] > b[filter] ? (order ? 1 : -1) : a[filter] < b[filter] ? (order ?  -1 : 1) : 0;
      });
    }
  },
};
</script>
<style scoped>
table {
  border-collapse: separate;
  border-spacing: 0 0.4rem;
}
td {
  border: 0px;
  border-style: solid none;
  padding: 10px;
  background-color: white;
}
td:first-child {
  border-left-style: solid;
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
}
td:last-child {
  border-right-style: solid;
  border-bottom-right-radius: 40px;
  border-top-right-radius: 40px;
}
</style>
