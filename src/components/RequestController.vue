<template>
  <div class="d-flex flex-column align-center">
    <c-overlay :value="isActive" :opacity="0.9">
      <div
        class="d-flex justify-center flex-column align-center"
        v-if="isFailed"
      >
        <FailedIcon />
        <div class="mt-8 title font-weight-black">Ha ocurrido un error</div>
        <div class="body-1">No hemos pudido finalizar esta operacion.</div>
        <v-btn
          text
          class="text-capitalize"
          small
          color="orange"
          @click="showError = !showError"
          >{{ showError ? "Ver menos" : "Ver Mas" }}</v-btn
        >
        <div class="caption" v-if="showError">{{ getMessage }}</div>
      </div>
      <c-progress-circular
        v-if="isLoading"
        indeterminate
        color="primary"
        :size="50"
        :width="10"
      ></c-progress-circular>
      <CheckIcon v-if="isSuccess" />
    </c-overlay>
    <v-container
      style="z-index: 999; position: fixed; bottom: 3%;"
      v-if="isFailed"
    >
      <v-btn block large color="primary" class="text-capitalize" rounded
        >Ok, entiendo</v-btn
      >
    </v-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import CheckIcon from "@/components/CheckIcon";
import FailedIcon from '@/components/FailedIcon'
export default {
  components: {
    // CheckIcon,
    FailedIcon
  },
  data: () => ({
    showError: false
  }),
  computed: {
    ...mapGetters('request', [
      'isActive',
      'isLoading',
      'isSuccess',
      'isFailed',
      'getMessage'
    ])
  }
}
</script>
