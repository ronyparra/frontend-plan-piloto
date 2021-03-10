<template>
  <div class="d-flex flex-column align-center" style="z-index: 999" >
    <c-overlay :value="isActive" :opacity="0.9" >
      <Failed v-if="isFailed" :message="getMessage" />
      <Loading v-if="isLoading" />
      <Success v-if="isSuccess" />
    </c-overlay>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Failed from "./Failed";
import Loading from "./Loading";
import Success from "./Success";
export default {
  components: {
    Failed,
    Loading,
    Success,
  },
  computed: {
    ...mapGetters("request", [
      "isActive",
      "isLoading",
      "isSuccess",
      "isFailed",
      "getMessage",
    ]),
  },
};
</script>
