import { LOADING, FETCH, CHANGE_PARAMS, FETCH_PENDIENTE, FETCH_CLIENTE } from "./contants";
export default {
  [FETCH]: (state, request) => (state.data = request),
  [LOADING]: (state, request) => (state.loading = request),
  [FETCH_CLIENTE]: (state, request) => (state.cliente = request),
  [CHANGE_PARAMS]: (state,request) => state.params = request,
  [FETCH_PENDIENTE]: (state,request) => state.pendiente = request
};
