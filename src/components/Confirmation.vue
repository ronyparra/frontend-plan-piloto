<template>
  <div v-if="value">
    <div
      class="d-flex flex-column align-center"
      style="position: fixed; z-index: 999;"
    >
      <c-overlay :value="true" :opacity="0.9">
        <div class="fill-height d-flex justify-space-around flex-column ">
          <div class="d-flex flex-column align-center">
            <div class="mb-16 text-h4 font-weight-black">Hey!</div>
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>

            <div class="mt-8 title font-weight-black">
              <slot />
            </div>
          </div>

          <v-container class="d-flex justify-center">
            <v-row>
              <v-col cols="12" sm="6">
                <v-btn
                  block
                  large
                  color="red"
                  class="text-capitalize"
                  rounded
                  @click="close()"
                  >No, quiero cancelar</v-btn
                ></v-col
              >
              <v-col cols="12" sm="6">
                <v-btn
                  block
                  large
                  color="primary"
                  class=" text-capitalize"
                  rounded
                  @click="confirm()"
                  >Si, estoy seguro</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </div>
      </c-overlay>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: Boolean
  },
  data: () => ({}),
  methods: {
    confirm () {
      this.$emit('confirm')
    },
    close () {
      this.$emit('input', false)
    }
  }
}
</script>
<style scoped>
.checkmark {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: orange;
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px orange;
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
::v-deep .v-overlay__content {
  height: 100%;
  max-height: 700px;
}
</style>
