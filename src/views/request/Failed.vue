<template>
  <div class="fill-height d-flex justify-space-around flex-column ">
    <div class="d-flex flex-column align-center">
      <div class="mb-16 text-h4 font-weight-black">Oh no!</div>
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
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <div class="mt-8 title font-weight-black">Ha ocurrido un error</div>
      <div class="body-1">No hemos pudido finalizar esta operacion.</div>
      <v-btn
        v-if="message"
        text
        class="text-capitalize"
        small
        color="orange"
        @click="showError = !showError"
        >{{ showError ? "Ver menos" : "Ver Mas" }}</v-btn
      >
      <div class="caption font-weight-black" v-if="showError">
        {{ message.title }}
      </div>
      <div v-if="showError">
        <div class="caption text-center">{{ message.message }}</div>
        <div class="caption " v-for="(item, i) of message.list" :key="i">
          {{ item }}
        </div>
      </div>
    </div>

    <v-container class="d-flex justify-center">
      <v-row>
        <v-col cols="12">
          <v-btn
            block
            large
            color="primary"
            class="text-capitalize"
            rounded
            @click="close()"
            >Ok, entiendo</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: {
    message: [String, Object]
  },
  data: () => ({
    showError: false
  }),
  methods: {
    ...mapActions('request', ['endRequest']),
    close () {
      this.endRequest()
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
</style>
