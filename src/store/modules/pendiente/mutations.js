import { LOADING, FETCH, SET_ID, FETCH_DASH } from "./contants";
export default {
  [FETCH]: (state, request) => (state.data = request),
  [FETCH_DASH]: (state, request) => (state.dashboard = request),
  [SET_ID]: (state, request) => (state.dataId = request),
  [LOADING]: (state, request) => (state.loading = request),
};
