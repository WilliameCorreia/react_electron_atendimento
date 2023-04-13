import axios, { AxiosResponse } from "axios";
import { InternalServerError } from "./ApiAtendimento";
/* import refreshToken from "./refreshToken"; */
import ApiAuth from "./ApiAuth";

interface TokenResponse {
    id: number;
    username: string;
    dataRegistro: string;
    dataAtualizacao: string;
    dataHoraValidado: string;
    dataExpira: string;
    ativo: true;
    jwtToken: string;
    integraApi: boolean;
    refreshToken: string;
}

const ApiTasy = axios.create({
    //producao
    //baseURL: 'https://servicesapppronutrir.com.br/apitasy/api/v1/',
    baseURL: 'https://servicesapppronutrir.com.br/apitasytest/api/v1/',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

ApiTasy.interceptors.response.use(
    /* eslint-disable */
    (response: AxiosResponse<any>) => response,
    ({ response }: { response: AxiosResponse<string> }) => {
        console.log("interceptors",response)
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

const GetAuth = async () => {
    try {
        const response = await ApiAuth.get<TokenResponse>('auth/authToken');
        const { jwtToken, refreshToken } = response.data;
        ApiTasy.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
        console.log(jwtToken);
        return jwtToken;
    } catch (error) {
        console.log('Error token', error);
    }
}

ApiTasy.interceptors.request.use(async (req) => {
    try {
        const token = await GetAuth();
        req.headers.Authorization = `Bearer ${token}`
        /* console.log(req.headers['common']);
        const tokenUpdated = await refreshToken(req.headers['common']);
        if (tokenUpdated) {
            await GetAuth();
            //req.headers.Authorization = `Bearer ${tokenUpdated}`;
        }else{
            await GetAuth();
        } */
    } catch (error) {
        console.log('erro resquest ==> ', error);
        return Promise.reject(error);
    } finally {
        return req;
    }
});

export default ApiTasy;

