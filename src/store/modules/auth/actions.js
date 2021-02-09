import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_RESET, url } from "./contants";
import { post } from "@/services/api/api.services.js";
import { saveToken } from "@/storage/token.storage.js";
import { saveUser } from "@/storage/user.storage.js";
import router from "@/router";
export default {
  async loginAction({ commit }, { username, password, remember }) {
    commit(LOGIN_REQUEST);
    const response = await post(url, { username, password, remember });
    if (response) {
      console.log(response);
      saveToken(response.data.data.token, remember);
      saveUser(response.data.data.user, remember);
      commit(LOGIN_SUCCESS, response.data.data);
      router.push(router.history.current.query.redirect || "/");
    } else {
      commit(LOGIN_RESET);
    }
  },
  logout({ commit }) {
    commit(LOGIN_RESET);
  },
};
