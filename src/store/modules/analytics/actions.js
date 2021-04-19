import { FETCH, FETCH_PENDIENTE, FETCH_CLIENTE,  FETCH_CONCEPTO,FETCH_CATEGORIA, CHANGE_PARAMS, LOADING, url, FETCH_TECNICO } from "./contants";
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
  async fetchTecnico({ commit, getters }) {
    commit(LOADING, true);
    try {
      const { desde, hasta } = getters.getParams;
      const response = await get(
        `${url.tecnico}?desde=${desde}&hasta=${hasta}`
      );
      commit(FETCH_TECNICO, response.data);
    } catch (e) {
      commit(LOADING, false);
      throw e;
    }
    commit(LOADING, false);
  },
  async fetchCategoria({ commit, getters }) {
    commit(LOADING, true);
    try {
      const { desde, hasta } = getters.getParams;
      const response = await get(
        `${url.categoria}?desde=${desde}&hasta=${hasta}`
      );
      commit(FETCH_CATEGORIA, response.data);
    } catch (e) {
      commit(LOADING, false);
      throw e;
    }
    commit(LOADING, false);
  },
  changeParams: async ({ commit }, params) => commit(CHANGE_PARAMS, params),
};
