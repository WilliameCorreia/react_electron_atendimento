import axios, { AxiosRequestHeaders } from 'axios';
import moment from 'moment';
import jwt_decode, { JwtPayload } from "jwt-decode";
import {
    getRefreshTokenAuth, deleteRefreshToken, saveRefreshToken
} from './localStorage/storage';

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

const refreshToken = async (tokenHeads: AxiosRequestHeaders) => {

    const { Authorization } = tokenHeads;

    if (typeof Authorization === 'string') {

        const payload = jwt_decode<JwtPayload>(Authorization.replace('Bearer ', ''));

        const { exp } = payload;

        const expired = exp ? moment.unix(exp).diff(moment(), 'seconds') < 100 : true;

        const rfToken: string = await getRefreshTokenAuth();

        if (expired) {
            console.log(' ==> token expirado ');
            const {
                data: { jwtToken, refreshToken },
            } = await axios.post<TokenResponse>(
                `https://servicesapppronutrir.com.br/usershield/api/v1/Auth/refreshtoken`,
                { token: rfToken },
            );
            await deleteRefreshToken();
            await saveRefreshToken(refreshToken);
            return jwtToken;
        } else {
            return null;
        }
    } else {
        return null;
    }

};

export default refreshToken;