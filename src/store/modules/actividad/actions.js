import { FETCH, LOADING, SET_ID, SET_PARAMS, url } from "./contants";
import { get, post, put, del } from "@/services/api/api.services.js";

export default {
  async fetchActividad(
    { commit },
    { idcliente, idsucursal, fechadesde, fechahasta, idestadocobro }
  ) {
    const urlWithParams = `${url}/?cliente=${
      idcliente ? idcliente : "undefined"
    }&sucursal=${
      idsucursal ? idsucursal : "undefined"
    }&desde=${fechadesde}&hasta=${fechahasta}&estado=${
      idestadocobro ? idestadocobro : "undefined"
    }`;
    commit(LOADING, true);
    try {
      const response = await get(urlWithParams);
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
  async setChangeStatus({ commit }, form) {
    commit(LOADING, true);
    const response = await post(url + "/status", form);
    commit(LOADING, false);
    return response;
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
  async deleteActividad({ commit, dispatch }, id) {
    commit(LOADING, true);
    const response = await del(`${url}/${id}`);
    dispatch("pendiente/fetchPendiente", null, { root: true });
    commit(LOADING, false);
    return response;
  },
  setParams: async ({ commit }, params) => commit(SET_PARAMS, params),
};
