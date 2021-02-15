import { LOADING, FETCH } from "./contants";
export default {
  [FETCH]: (state, request) => (state.data = request),
  [SET_ID]: (state, request) => (state.dataId = request),
  [LOADING]: (state, request) => (state.loading = request),
};
