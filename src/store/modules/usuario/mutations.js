import { LOADING, FETCH } from "./contants";
export default {
  [FETCH]: (state, request) => (state.usuario = request),
  [LOADING]: (state, request) => (state.loading = request),
};
