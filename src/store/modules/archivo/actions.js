import { FETCH, LOADING, SET_ID, SET_ID_CLIENTE, url } from "./contants";
import { get, post, del, put  } from "@/services/api/api.services.js";

export default {
  async fetchArchivo({ commit }) {
    commit(LOADING, true);
    try {
      const response = await get(url.root);
      commit(FETCH, response.data);
    } catch (e) {
      commit(LOADING, false);
      throw e;
    }
    commit(LOADING, false);
  },
  fetchArchivoIdCliente: async ({ commit }, {id, idcarpeta}) => {
    commit(LOADING, true);
    commit(SET_ID_CLIENTE,[]);
    try {
      const response = await get(`${url.cliente}/${id}?idcarpeta=${idcarpeta}`);
      commit(SET_ID_CLIENTE, response.data);
    } catch (e) {
      console.log(e);
    }
    commit(LOADING, false);
  },
  fetchArchivoId: async ({ commit }, { id, data }) => {
    if (data) return commit(SET_ID, data);
    commit(LOADING, true);
    try {
      const response = await get(`${url.root}/${id}`);
      commit(SET_ID, response.data);
    } catch (e) {
      console.log(e);
    }
    commit(LOADING, false);
  },
  async createArchivo({ commit }, form) {
    commit(LOADING, true);
    const response = await post(url.root, form);
    commit(LOADING, false);
    return response;
  },
  updateArchivo: async ({ commit }, { id, form }) => {
    commit(LOADING, true);
    const response = await put(`${url.root}/${id}`, form);
    commit(LOADING, false);
    return response;
  },
  deleteArchivo: async ({ commit }, id) => {
    commit(LOADING, true);
    const response = await del(`${url.root}/${id}`);
    commit(LOADING, false);
    return response;
  },
};
