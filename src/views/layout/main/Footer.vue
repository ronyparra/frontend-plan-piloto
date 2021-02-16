<template>
  <c-footer
    padless
    app
    color="secondary"
    class="d-flex flex-row justify-space-around"
  >
    <c-btn
      height="100%"
      v-for="(item, i) of navs"
      :key="i"
      :to="item.to"
      x-small
      text
      plain
      active-class="primary--text"
    >
      <c-col cols="12">
        <c-row width="100%" style="place-content: center; margin-bottom: 12px;">
          <c-icon>{{ item.icon }}</c-icon>
        </c-row>
        <c-row width="100%" style="place-content: center">
          <div class="caption mx-n1 text-capitalize">{{ item.title }}</div>
        </c-row>
      </c-col>
    </c-btn>
  </c-footer>
</template>
<script>
import { navs } from "./constants";
export default {
  computed:{
    navs:()=>navs
  }
};
</script>
