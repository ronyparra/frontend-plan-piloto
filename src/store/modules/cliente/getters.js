export default {
  getCliente: (state) => state.data,
  getClienteId: (state) => state.dataId,
  getClienteName: (state) => state.dataId ? state.dataId.razonsocial : '',
  isLoading: (state) => state.loading
}
