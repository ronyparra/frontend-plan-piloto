<template>
  <c-app-bar color="secondary" flat dense app>
    <c-app-bar-nav-icon @click.native.stop="$emit('click:drawer')">
      <c-icon>notes</c-icon></c-app-bar-nav-icon>
    <c-spacer></c-spacer>
    <c-toolbar-title class="title">{{ $route.name }}</c-toolbar-title>
  </c-app-bar>
</template>
<script>
export default {};
</script>
