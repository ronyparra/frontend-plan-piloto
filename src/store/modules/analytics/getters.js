export default {
  getActividad: (state) => state.data,
  getPendiente: (state) => state.pendiente,
  getCliente: (state) => state.cliente,
  isLoading: (state) => state.loading,
  getParams: (state) => state.params
};
