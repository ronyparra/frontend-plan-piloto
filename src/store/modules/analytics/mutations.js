import {
  LOADING,
  FETCH,
  CHANGE_PARAMS,
  FETCH_PENDIENTE,
  FETCH_CONCEPTO,
  FETCH_CLIENTE,
  FETCH_TECNICO,
  FETCH_CATEGORIA,
  FETCH_ESTADO,
  FETCH_COBRO_TECNICO,
} from "./contants";
export default {
  [FETCH]: (state, request) => (state.data = request),
  [LOADING]: (state, request) => (state.loading = request),
  [FETCH_CLIENTE]: (state, request) => (state.cliente = request),
  [FETCH_CONCEPTO]: (state, request) => (state.concepto = request),
  [CHANGE_PARAMS]: (state, request) => (state.params = request),
  [FETCH_PENDIENTE]: (state, request) => (state.pendiente = request),
  [FETCH_TECNICO]: (state, request) => (state.tecnico = request),
  [FETCH_CATEGORIA]: (state, request) => (state.categoria = request),
  [FETCH_COBRO_TECNICO]: (state, request) => (state.cobrotecnico = request),
  [FETCH_ESTADO]: (state, request) => (state.estado = request),
};
