import { request } from "./axios.service";
import store from "@/store";
export const get = async (url) => {
  const requestData = {
    method: "GET",
    url: url,
  };
  try {
    const response = await request(requestData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const post = async (url, data) => {
  store.dispatch("request/startRequest");
  const requestData = {
    method: "POST",
    url: url,
    data: data,
  };
  try {
    const response = await request(requestData);
    store.dispatch("request/successRequest");
    return {
      data: response.data,
      success: true,
    };
  } catch (error) {
    store.dispatch("request/failedRequest", error.message);
    return {
      message: error.message,
      success: false,
    };
  }
};
export const put = () => {};
export const del = () => {};
