<template>
  <div class="d-flex justify-center flex-column align-center">
    <div class="mb-16 text-h4 font-weight-black">Correcto!</div>
    <svg
      class="checkmark"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        class="checkmark__check"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <div class="mt-16 body-1">Su orden fue completada con exito</div>
    <c-container style="z-index: 999; position: fixed; bottom: 3%;">
      <c-btn
        block
        large
        color="primary"
        class="text-capitalize"
        rounded
        @click="close()"
        >Continuar</c-btn
      >
    </c-container>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("request", ["endRequest"]),
    close() {
      this.endRequest();
    },
  },
};
</script>
<style scoped>
.checkmark {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: rgb(13, 177, 13);
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px rgb(13, 177, 13);
  animation: fill 0.4s ease-in-out 0.4s forwards,
    scale 0.3s ease-in-out 0.9s both;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 500;
  stroke-dashoffset: 500;
  animation: stroke 0.8s cubic-bezier(0.65, 0, 0.45, 1) 0.4s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes scale {
  0%,
  100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}
</style>
