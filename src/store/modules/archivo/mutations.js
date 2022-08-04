import { LOADING, FETCH, SET_ID, SET_ID_CLIENTE } from './contants'
export default {
  [FETCH]: (state, request) => {
    state.data = request
    state.dataId = null
  },
  [SET_ID_CLIENTE]: (state, request) => (state.dataIdCliente = request),
  [SET_ID]: (state, request) => (state.dataId = request),
  [LOADING]: (state, request) => (state.loading = request)
}
