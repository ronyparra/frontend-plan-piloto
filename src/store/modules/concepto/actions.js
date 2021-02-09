import { FETCH, LOADING, url } from "./contants";
import { get, post } from "@/services/api/api.services.js";

export default {
  async fetchConcepto({ commit }) {
    commit(LOADING, true);
    try {
      const response = await get(url);
      commit(FETCH, response.data);
    } catch (e) {
      commit(LOADING, false);
      throw e;
    }
    commit(LOADING, false);
  },
  async createConcepto({ commit }, form) {
    commit(LOADING, true);
    const response = await post(url, form);
    commit(LOADING, false);
    return response;
  },
};
