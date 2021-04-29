import { FETCH, LOADING, SET_ID, SET_PARAMS, url } from "./contants";
import { get, post, del, put  } from "@/services/api/api.services.js";

export default {
  async fetchCobro({ commit },{idcliente, idusuario, fechadesde, fechahasta, idestadocobro}) {
    const urlWithParams = `${url}/?idusuario=${idusuario ? idusuario : "undefined"}&cliente=${
      idcliente ? idcliente : "undefined"
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
  fetchCobroId: async ({ commit }, { id, data }) => {
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
  async createCobro({ commit }, form) {
    commit(LOADING, true);
    const response = await post(url, form);
    commit(LOADING, false);
    return response;
  },
  updateCobro: async ({ commit }, { id, form }) => {
    commit(LOADING, true);
    const response = await put(`${url}/${id}`, form);
    commit(LOADING, false);
    return response;
  },
  deleteCobro: async ({ commit }, id) => {
    commit(LOADING, true);
    const response = await del(`${url}/${id}`);
    commit(LOADING, false);
    return response;
  },
  setParams: async ({ commit }, params) => commit(SET_PARAMS, params),
};
