import apiClient from ".";

export const apiGetCall = (url = "", config = {}) => {
  return apiClient.get(url, config);
};

export const apiPostCall = (url = "", data = {}, config = {}) => {
  return apiClient.post(url, data, config);
};
