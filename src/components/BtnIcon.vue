<template>
  <c-btn
    elevation="2"
    text
    color="primary"
    fab
    x-small
    @click="$emit('click')"
    ><c-icon><slot/></c-icon></c-btn
  >
</template>

