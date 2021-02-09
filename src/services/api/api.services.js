import { request } from "./axios.service";
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
  const requestData = {
    method: "POST",
    url: url,
    data: data,
  };
  try {
    const response = await request(requestData);
    return {
      data: response.data,
      success: true,
    };
  } catch (error) {
    return {
      message: error.message,
      success: false,
    };
  }
};
export const put = () => {};
export const del = () => {};
