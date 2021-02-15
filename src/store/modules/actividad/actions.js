import { FETCH, LOADING, SET_ID, url } from "./contants";
import { get, post,put, del } from "@/services/api/api.services.js";

export default {
  async fetchActividad({ commit }) {
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
  async fetchActividadId({ commit }, { id, data }) {
    if (data) return commit(SET_ID, data);
    commit(LOADING, true);
    try {
      const response = await get(`${url}/${id}`);
      commit(SET_ID, response.data);
    } catch (e) {
      console.log(e);
    }
    commit(LOADING, false);
  },
  async createActividad({ commit }, form) {
    commit(LOADING, true);
    const response = await post(url, form);
    commit(LOADING, false);
    return response;
  },
  async updateActividad({ commit }, { id, form }) {
    commit(LOADING, true);
    const response = await put(`${url}/${id}`, form);
    commit(LOADING, false);
    return response;
  },
  async deleteActividad({ commit },id) {
    commit(LOADING, true);
    const response = await del(`${url}/${id}`);
    commit(LOADING, false);
    return response;
  },
};
