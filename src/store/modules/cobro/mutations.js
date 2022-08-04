import { LOADING, FETCH, SET_ID, SET_PARAMS } from './contants'
export default {
  [FETCH]: (state, request) => {
    state.data = request
    state.dataId = null
  },
  [SET_ID]: (state, request) => (state.dataId = request),
  [LOADING]: (state, request) => (state.loading = request),
  [SET_PARAMS]: (state, request) => (state.params = request)
}
