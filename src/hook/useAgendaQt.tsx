import { useQuery } from "@tanstack/react-query";
import ApiTasy from "../services/ApiTasy";
import moment from "moment";
import { useContext } from "react";
import NotificationGlobalContext from "../contexts/notificationContext";

export interface IAgendaQT {
    //DT_PREVISTA: string;
    dT_REAL: string;
    cD_PESSOA_FISICA: string;
    nM_PESSOA_FISICA: string;
    dT_NASCIMENTO: string;
    cD_ESTABELECIMENTO: number;
    cD_MEDICO_RESP: number;
    //DS_DIA_CICLO: string;
    //QT_PESO: string;
    //QT_ALTURA: number;
    //QT_SUPERF_CORPORAL: number;
    //DT_PREVISTA_1: string;
    //DT_REAL_1: string;
    //NR_SEQ_PACIENTE: number;
    //PROTOCOLO: string;
    //NM_MEDICACAO: string;
}

interface IResponseAgendaQt {
    result: IAgendaQT[];
}

const useGetAgendaQt = () => {

    const { addAlert } = useContext(NotificationGlobalContext);

    return useQuery(['agendasConsultas'], async () => {
        const { result } = (await ApiTasy.get<IResponseAgendaQt>(
            `AgendaQuimio/GetAgendaQuimioterapiaGeral/7,75,${moment().format('YYYY-MM-DD')},${moment().format(
                'YYYY-MM-DD',
            )}?pagina=1&rows=100`,
        )).data;

        console.log(result);

        const resultByOrder = result.sort((a, b) => {
            return a.dT_REAL < b.dT_REAL
                ? -1
                : a.dT_REAL > b.dT_REAL
                ? 1
                : 0;
        });

        return resultByOrder;
    },{
        staleTime: 60 * 30000,
        onError: () => {
            addAlert({
                message: 'Não foi possivel adicionar o Paciente',
                status: 'error',
            });
        }
    });
}

export default useGetAgendaQt;