import { LOADING, FETCH, CHANGE_PARAMS } from "./contants";
export default {
  [FETCH]: (state, request) => (state.data = request),
  [LOADING]: (state, request) => (state.loading = request),
  [CHANGE_PARAMS]: (state,request) => state.params = request
};
