import {create} from 'apisauce';

const api = create({
  baseURL: 'https://skm.com.br/prooxi/api',
  timeout: 20000,
});

api.addResponseTransform(response => {
  if (!response.ok) {
    throw response;
  }
});

export default api;
