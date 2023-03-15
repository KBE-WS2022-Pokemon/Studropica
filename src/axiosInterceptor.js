import axios from 'axios';

import { getUser, login, logout } from "./auth_helper";

const getHeaderWithUserToken = async () => {
  const user = await getUser();
  if (user && user.access_token) {
    const headers = {
      Accept: 'application/json',
      Authorization: 'Bearer ' + user.access_token,
    };
    return headers;
  } else {
    throw new Error('user is not logged in');
  }
};

axios.interceptors.request.use(async (config) => {
  const headers = await getHeaderWithUserToken();
  config.headers = headers;
  return config;
});

export default axios;
