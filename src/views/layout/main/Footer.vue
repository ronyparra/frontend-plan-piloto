<template>
  <c-app-bar
    app
    bottom
    elevation="0"
    style="z-index: 1"
    color="secondary"
    class="d-flex flex-row justify-space-around"
  >
    <div v-for="(item, i) of navs" :key="i">
      <c-btn
        v-if="!item.disableFooter"
        height="100%"
        :to="item.to"
        x-small
        text
        plain
        active-class="primary--text"
      >
        <c-col cols="12">
          <c-row
            width="100%"
            style="place-content: center; margin-bottom: 12px;"
          >
            <c-icon>{{ item.icon }}</c-icon>
          </c-row>
          <c-row width="100%" style="place-content: center">
            <div class="caption mx-n1 text-capitalize">{{ item.title }}</div>
          </c-row>
        </c-col>
      </c-btn>
    </div>
  </c-app-bar>
</template>
<script>
import { navs } from "./constants";
export default {
  computed: {
    navs: () => navs,
  },
};
</script>
