import { FETCH, CHANGE_PARAMS, LOADING, url } from "./contants";
import { get } from "@/services/api/api.services.js";

export default {
  async fetchActividad({ commit, getters }) {
    commit(LOADING, true);
    try {
      const { desde, hasta } = getters.getParams;
      const response = await get(
        `${url.actividad}?desde=${desde}&hasta=${hasta}`
      );
      commit(FETCH, response.data);
    } catch (e) {
      commit(LOADING, false);
      throw e;
    }
    commit(LOADING, false);
  },
  changeParams: async ({ commit }, params) => commit(CHANGE_PARAMS, params),
};
