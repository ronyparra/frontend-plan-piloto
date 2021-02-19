import { FETCH, LOADING, url } from "./contants";
import { get  } from "@/services/api/api.services.js";

export default {
  async fetchEstadoCobro({ commit }) {
    commit(LOADING, true);
    try {
      const response = await get(url);
      commit(FETCH, response.data);
    } catch (e) {
      commit(LOADING, false);
      throw e;
    }
    commit(LOADING, false);
  }
};
