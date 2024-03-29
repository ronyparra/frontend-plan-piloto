import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_RESET, url } from "./contants";
import { post } from "@/services/api/api.services.js";
import { saveToken, removeToken } from "@/storage/token.storage.js";
import { savePermission, removePermission } from "@/storage/permission.storage.js";
import { saveUser, removeUser } from "@/storage/user.storage.js";
import router from "@/router";
export default {
  async loginAction({ commit }, { username, password, remember }) {
    commit(LOGIN_REQUEST);
    const response = await post(
      url,
      { username, password, remember },
      "disabledEvents"
    );
    if (response.success) {
      saveToken(response.data.data.token, remember);
      saveUser(response.data.data.user, remember);
      savePermission(response.data.data.permission,remember);
      commit(LOGIN_SUCCESS, response.data.data);
      router.push(router.history.current.query.redirect || "/");
      return null;
    } else {
      commit(LOGIN_RESET);
      return response.message;
    }
  },
  logout({ commit }) {
    commit(LOGIN_RESET);
    removeToken();
    removeUser();
    removePermission();
    router.push("/login");
    location.reload();
  },
};
