import { LOADING, FETCH } from "./contants";
export default {
  [FETCH]: (state, request) => (state.cliente = request),
  [LOADING]: (state, request) => (state.loading = request),
};
