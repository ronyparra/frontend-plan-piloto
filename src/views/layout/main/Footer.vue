<template>
  <c-footer
    padless
    app
    color="secondary"
    class="d-flex flex-row justify-space-around"
  >
    <c-btn
      height="100%"
      v-for="(item, i) of buttons"
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
export default {
  data: () => ({
    buttons: [
      {
        icon: "home",
        to: "/",
        title: "Inicio",
      },
      {
        icon: "assignment",
        to: "/actividad",
        title: "Actividad",
      },
      {
        icon: "account_box",
        to: "/cliente",
        title: "Clientes",
      },
      {
        icon: "add_shopping_cart",
        to: "/concepto",
        title: "Conceptos",
      },
      
      {
        icon: "query_builder",
        to: "/pendiente",
        title: "Pendientes",
      },
    ],
  }),
};
</script>
