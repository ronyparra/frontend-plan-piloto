import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_RESET } from "./contants";
export default {
  [LOGIN_REQUEST]: (state) => {
    state.loading = true;
    state.token = null;
    state.isLogin = false;
  },
  [LOGIN_SUCCESS]: (state, request) => {
    state.loading = false;
    state.user = request.user;
    state.token = request.token;
    state.isLogin = true;
  },
  [LOGIN_RESET]: (state) => {
    state.loading = false;
    state.token = null;
    state.isLogin = false;
  },
};
