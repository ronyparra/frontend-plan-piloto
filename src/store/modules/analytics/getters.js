export default {
  getActividad: (state) => state.data,
  getPendiente: (state) => state.pendiente,
  getCliente: (state) => state.cliente,
  getConcepto: (state) => state.concepto,
  getEstado: (state) => state.estado,
  getTecnico: (state) => state.tecnico,
  getCategoria: (state) => state.categoria,
  getCobroTecnico: (state) => state.cobrotecnico,
  isLoading: (state) => state.loading,
  getParams: (state) => state.params
}
