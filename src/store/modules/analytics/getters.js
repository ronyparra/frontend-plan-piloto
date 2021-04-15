export default {
  getActividad: (state) => state.data,
  getPendiente: (state) => state.pendiente,
  getCliente: (state) => state.cliente,
  getConcepto: (state) => state.concepto,
  isLoading: (state) => state.loading,
  getParams: (state) => state.params
};
