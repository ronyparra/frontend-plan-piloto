import { request } from "./axios.service";
export const get = async (url) => {
  const requestData = {
    method: "GET",
    url: url,
  };
  try {
    const response = await request(requestData);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const post = async (url,data) => {
  const requestData = {
    method: "POST",
    url: url,
    data: data
  };
  try {
    const response = await request(requestData);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const put = () => {};
export const del = () => {};
