<template>
  <c-card flat>
    <c-card-text>
      <c-row dense>
        <c-col cols="12" sm="5">
          <AutocompleteEstadoCobro :dense="false" :filled="false" />
        </c-col>

        <c-btn class="mt-md-6 mt-0" rounded small text color="blue"
          >Cambiar Estado</c-btn
        >
        <v-spacer></v-spacer>

        <c-btn class="mt-md-6 mt-0" rounded small text color="red">Generar PDF</c-btn>
      </c-row>
    </c-card-text></c-card
  >
</template>
<script>
import AutocompleteEstadoCobro from "../estadocobro/Autocomplete";
export default {
  components: {
    AutocompleteEstadoCobro,
  },
};
</script>
