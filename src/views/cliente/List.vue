<template>
  <div>
    <c-app-bar app flat color="secondary">
      <c-toolbar-title class="title font-weight-black">
        {{ $route.name }}
      </c-toolbar-title>
      <div style="position: absolute; right: 3%;">
        <BtnSearch class="mr-1" @click="search = !search" />
        <BtnAdd to="/cliente/add" />
      </div>
      <template v-slot:extension v-if="search">
        <SearchField class="mb-2" />
      </template>
    </c-app-bar>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :mobile-breakpoint="0"
      :items-per-page="99999"
      hide-default-footer
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="test(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="test(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import BtnAdd from "@/components/BtnAdd";
import BtnSearch from "@/components/BtnSearch";
import SearchField from "@/components/SearchField";
export default {
  components: {
    BtnAdd,
    BtnSearch,
    SearchField,
  },
  methods: {
    test() {},
  },
  data: () => ({
    search: false,
    headers: [
      {
        text: "#",
        align: "start",
        value: "calories",
      },
      { text: "Cliente", value: "name" },
      { text: "Ruc", value: "iron" },
      { text: "Opciones", value: "actions", align: "end" },
    ],
    desserts: [
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
      {
        name: "Rony Parra",
        calories: 1,
        iron: "5903532-3",
      },
    ],
  }),
};
</script>
