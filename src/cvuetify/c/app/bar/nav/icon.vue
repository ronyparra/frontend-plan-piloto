<template>
  <v-app-bar-nav-icon :to="to" @click="$emit('click')"
    ><slot
  /></v-app-bar-nav-icon>
</template>
<script>
export default {
  props:{
    to:{
      type: String
    }
  }
}
</script>

