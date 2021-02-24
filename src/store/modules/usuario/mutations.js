import { LOADING, FETCH, SET_ID } from "./contants";
export default {
  [FETCH]: (state, request) => {
    state.data = request,
    state.dataId = null
  },
  [SET_ID]: (state, request) => (state.dataId = request),
  [LOADING]: (state, request) => (state.loading = request),
};
