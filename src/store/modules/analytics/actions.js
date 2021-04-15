import { FETCH, FETCH_PENDIENTE, FETCH_CLIENTE,  FETCH_CONCEPTO,CHANGE_PARAMS, LOADING, url } from "./contants";
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
  async fetchPendiente({ commit, getters }) {
    commit(LOADING, true);
    try {
      const { desde, hasta } = getters.getParams;
      const response = await get(
        `${url.pendiente}?desde=${desde}&hasta=${hasta}`
      );
      commit(FETCH_PENDIENTE, response.data);
    } catch (e) {
      commit(LOADING, false);
      throw e;
    }
    commit(LOADING, false);
  },
  async fetchCliente({ commit, getters }) {
    commit(LOADING, true);
    try {
      const { desde, hasta } = getters.getParams;
      const response = await get(
        `${url.cliente}?desde=${desde}&hasta=${hasta}`
      );
      commit(FETCH_CLIENTE, response.data);
    } catch (e) {
      commit(LOADING, false);
      throw e;
    }
    commit(LOADING, false);
  },
  async fetchConcepto({ commit, getters }) {
    commit(LOADING, true);
    try {
      const { desde, hasta } = getters.getParams;
      const response = await get(
        `${url.concepto}?desde=${desde}&hasta=${hasta}`
      );
      commit(FETCH_CONCEPTO, response.data);
    } catch (e) {
      commit(LOADING, false);
      throw e;
    }
    commit(LOADING, false);
  },
  changeParams: async ({ commit }, params) => commit(CHANGE_PARAMS, params),
};
