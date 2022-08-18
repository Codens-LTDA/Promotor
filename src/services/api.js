import { create } from 'apisauce';

const api = create({
    baseURL: 'http://web2.skm.com.br/sterilabldna/api',
    timeout: 20000,
});

api.addResponseTransform(response => {
    if (!response.ok) throw response;
});

export default api;