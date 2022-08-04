<template>
  <v-app-bar color="secondary"   elevation="1"  dense app absolute :clipped-left="$vuetify.breakpoint.lgAndUp">
    <v-app-bar-nav-icon @click.native.stop="$emit('click:drawer')">
      <c-icon>notes</c-icon></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-toolbar-title class="title">{{ $route.name }}</v-toolbar-title>
  </v-app-bar>
</template>
<script>
export default {}
</script>
