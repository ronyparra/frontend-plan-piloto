<template>
  <v-btn
    :block="block"
    :color="color"
    :dark="dark"
    :height="height"
    :rounded="rounded"
    :to="to"
    :small="small"
    :x-small="xSmall"
    :x-large="xLarge"
    :text="text"
    :elevation="elevation"
    :plain="plain"
    :fab="fab"
    :active-class="activeClass"
    @click="$emit('click')"
    ><slot
  /></v-btn>
</template>
<script>
export default {
  props: {
    elevation: String,
    fab:{
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      defaut: false,
    },
    color: String,
    dark: {
      type: Boolean,
      defaut: false,
    },
    rounded: {
      type: Boolean,
      defaut: false,
    },
    text: {
      type: Boolean,
      defaut: false,
    },
    plain: {
      type: Boolean,
      defaut: false,
    },
    small:{
      type: Boolean,
      defaut: false,
    },
    height: String,
    to: String,
    "active-class": String,
    "x-small":{
      type: Boolean,
      defaut: false,
    },
    "x-large": {
      type: Boolean,
      defaut: false,
    },
    
  },
};
</script>
