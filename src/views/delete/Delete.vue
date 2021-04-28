<template>
  <div v-if="value">
    <div class="d-flex flex-column align-center" style="position: fixed; z-index: 99;">
      <c-overlay :value="true" :opacity="0.9">
        <div class="d-flex justify-center flex-column align-center">
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
            Esta seguro de eliminar este registro?
          </div>

          <c-container style="z-index: 999; position: fixed; bottom: 3%;">
            <c-row dense>
              <c-col cols="12" sm="5">
                <c-btn
                  block
                  large
                  color="red"
                  class="text-capitalize"
                  rounded
                  @click="close()"
                  >No, quiero cancelar</c-btn
                >
              </c-col>
              <c-spacer></c-spacer>
              <c-col cols="12" sm="5">
                <c-btn
                  block
                  large
                  color="primary"
                  class="mt-2 text-capitalize"
                  rounded
                  @click="confirmDelete()"
                  >Si, estoy seguro</c-btn
                >
              </c-col>
            </c-row>
          </c-container>
        </div>
      </c-overlay>
    </div>
  </div>
</template>
<script>
import store from "@/store";
export default {
  props: {
    value: Boolean,
    "vuex-action": String,
    "id-to-delete": [String, Number],
  },
  data: () => ({}),
  methods: {
    async confirmDelete() {
      const response = await store.dispatch(this.vuexAction, this.idToDelete);
      if (response.success) this.$emit("success");
      this.close();
    },
    close() {
      this.$emit("input", false);
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
</style>
