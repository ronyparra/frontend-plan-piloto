<template>
  <c-navigation-drawer :value="value" absolute temporary>
    <template v-slot:prepend>
      <c-list-item two-line>
        <c-list-item-avatar>
          <c-icon large>account_circle</c-icon>
        </c-list-item-avatar>

        <c-list-item-content>
          <c-list-item-title>{{getUserInfo.nombre}} {{getUserInfo.apellido}}</c-list-item-title>
          <c-list-item-subtitle>Conectado</c-list-item-subtitle>
        </c-list-item-content>
      </c-list-item>
    </template>
    <c-divider></c-divider>
    <c-list nav dense>
      <c-list-item-group active-class="deep-purple--text text--accent-4">
        <c-list-item>
          <c-list-item-icon>
            <c-icon>account_box</c-icon>
          </c-list-item-icon>
          <c-list-item-content>
            <c-list-item-title>Cliente</c-list-item-title>
          </c-list-item-content>
        </c-list-item>
        <c-list-item>
          <c-list-item-icon>
            <c-icon>done</c-icon>
          </c-list-item-icon>
          <c-list-item-content>
            <c-list-item-title>Foo</c-list-item-title>
          </c-list-item-content>
        </c-list-item>
        <c-list-item>
          <c-list-item-icon>
            <c-icon>done</c-icon>
          </c-list-item-icon>
          <c-list-item-content>
            <c-list-item-title>Foo</c-list-item-title>
          </c-list-item-content>
        </c-list-item>
      </c-list-item-group>
    </c-list>
  </c-navigation-drawer>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    value: Boolean,
  },
  computed: {
    ...mapGetters("auth", ["getUserInfo"]),
  },
};
</script>
