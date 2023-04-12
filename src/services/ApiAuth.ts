import axios, { AxiosResponse } from 'axios';
import { InternalServerError } from './ApiAtendimento';

const ApiAuth = axios.create({
    //teste
    //baseURL: 'http://52.171.215.196:8000/',
    //producao
    baseURL: 'https://servicesapppronutrir.com.br/agentauth/api/v1/',
    //testeauth
    //baseURL: 'https://webapppronutrir.com.br:2300/api/v1/'
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IlVzZXJATW9iaWxlIzAxMTAiLCJyb2xlIjoiTW9iaWxlIiwibmJmIjoxNjY4NjI5NTIzLCJleHAiOjE2Njg2MzMxMjMsImlhdCI6MTY2ODYyOTUyM30._HXbw3tyQNxriRfFWiwAifiV5FjWcCwMuVADZIilcd8',
    },
});

ApiAuth.interceptors.response.use(
    /* eslint-disable */
    (response: AxiosResponse<any>) => response,
    ({ response }: { response: AxiosResponse<string> }) => {
        console.log("intercept response", response);
        if (response.status === 409) {
            return Promise.reject(new InternalServerError(response.data));
        }

        if (response.status === 500) {
            return Promise.reject(new InternalServerError(response.data));
        }

        if (response.status === 401) {
            return Promise.reject(new InternalServerError(response.data));
        }

        // Generic Error Response
        return Promise.reject(new InternalServerError(response.data));
    },
);

ApiAuth.interceptors.request.use(async (req) => {
    console.log("intercept request", req);
    return req;
});

export default ApiAuth;