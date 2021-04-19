<template>
  <div>
    <c-row dense>
      <v-spacer></v-spacer>
      <c-col cols="12" sm="6">
        <SearchField v-model="search" />
      </c-col>
    </c-row>
    <c-row dense style="max-height: 61vh" class="mt-1 overflow-y-auto">
      <c-col cols="12">
        <table id="my-table" style="width:100%">
          <tr>
            <th
              :class="item.headClass"
              v-for="(item, i) in headsFormated"
              :key="i"
            >
              {{ item.title }}
              <Sortable
                v-if="item.sortable != undefined"
                :active-class="item.activeClass"
                v-model="item.sortable"
                @click="filterItems(item.value, item.sortable)"
              />
            </th>
          </tr>
          <tr v-for="(item, i) in itemsFiltered" :key="i">
            <td :class="head.class" v-for="(head, j) in headers" :key="j">
              <span class="caption font-weight-thin">
              {{
                head.percent ? getPercent(item[head.value],head.value) : ''
              }}
              </span>
              {{
                head.number
                  ? formatNumber(item[head.value], head.percent, head.value)
                  : item[head.value]
              }}
              
            </td>
          </tr>
        </table>
      </c-col>
    </c-row>

    <c-row class="py-1" :key="key">
      <c-col cols="12">
        <table style="width:100%">
          <tr>
            <td
              id="td-total"
              :style="getWidth(j)"
              :class="head.class"
              v-for="(head, j) in headers"
              :key="j"
              class="white--text"
            >
              {{
                head.number ? formatNumber(getSubTotal(head.value)) : "Total"
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
import SearchField from "../../components/SearchField";
import Sortable from "./Sortable";
export default {
  components: {
    Sortable,
    SearchField,
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
    filter: String,
  },
  data: () => ({
    headsFormated: [],
    itemsFormated: [],
    asc: true,
    search: "",
    key: 1,
  }),
  mounted() {
    this.headsFormated = this.headers.map((x) => {
      return { ...x, activeClass: false };
    });
    this.itemsFormated = JSON.parse(JSON.stringify(this.items));
    this.filterItems();
  },
  watch: {
    items(val) {
      this.itemsFormated = JSON.parse(JSON.stringify(val));
      this.filterItems();
    },
  },
  computed: {
    itemsFiltered() {
      return this.itemsFormated.filter((item) =>
        Object.keys(item).some((key) =>
          String(item[key])
            .toLowerCase()
            .includes(this.search.toLowerCase())
        )
      );
    },
    getSubTotal: (vm) => (column) =>
      vm.itemsFiltered.reduce((acc, curr) => (acc = acc + curr[column]), 0),
    getWidth: () => (index) => {
      if (!document.getElementById("my-table")) return "";
      if (!document.getElementById("my-table").rows[0].cells[index]) return "";
      return `width: ${
        document.getElementById("my-table").rows[0].cells[index].offsetWidth
      }px;`;
    },
  },
  methods: {
    formatNumber:(value) => currencyFormatter(value),
    getPercent(value,column){
      const result = value * 100 / this.getSubTotal(column)
      return '('+currencyFormatter(result)+'%)';
    },
    filterItems(filter, desc) {
      if (!filter && desc === undefined) {
        filter = this.filter;
        desc = true;
      }
      this.headsFormated.map((x) => {
        x.activeClass = x.value === filter ? true : false;
      });
      this.itemsFormated.sort((a, b) => {
        return a[filter] > b[filter]
          ? !desc
            ? 1
            : -1
          : a[filter] < b[filter]
          ? !desc
            ? -1
            : 1
          : 0;
      });
      setTimeout(() => this.key++, 600);
    },
  },
};
</script>
<style scoped>
#td-total {
  background-color: rgb(178, 77, 209);
}
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
