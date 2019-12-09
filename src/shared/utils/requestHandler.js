import axios from 'axios';

export const parseRequest = (response) => {
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  return response.data;
};

export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;

  throw error;
};

export const doRequest = async (method, endpoint, data = {}, params = {}, headers = {}) => {
  const url = `http://localhost:5000/api/v1/${endpoint}`;

  await axios({
    method,
    url,
    data,
    params,
    headers,
  })

};