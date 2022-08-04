import { LOADING, FETCH } from './contants'
export default {
  [FETCH]: (state, request) => (state.data = request),
  [LOADING]: (state, request) => (state.loading = request)
}
