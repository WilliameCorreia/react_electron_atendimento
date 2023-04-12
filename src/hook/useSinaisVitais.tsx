import { useMutation, useQuery } from "@tanstack/react-query";
import ApiTasy from "../services/ApiTasy";
import { AxiosResponse } from "axios";
import { useContext } from "react";
import NotificationContext from "../contexts/notificationContext";

export interface ISinaisVitais {
    nR_SEQUENCIA: number;
    nR_ATENDIMENTO: number;
    dT_SINAL_VITAL: string;
    dT_ATUALIZACAO: string;
    iE_PRESSAO: string;
    iE_MEMBRO: string;
    iE_MANGUITO: string;
    iE_APARELHO_PA: string;
    cD_PACIENTE: string;
    nM_PESSOA_FISICA: string;
    dT_NASCIMENTO: string;
    cD_PESSOA_FISICA: string;
    qT_SATURACAO_O2: number;
    qT_TEMP: number;
    qT_PESO: number;
    qT_PA_SISTOLICA: number;
    qT_PA_DIASTOLICA: number;
    qT_PAM: number;
    qT_FREQ_CARDIACA: number;
    qT_FREQ_RESP: number;
    qT_ESCALA_DOR: number;
    iE_COND_SAT_O2: string;
    iE_MEMBRO_SAT_O2: string;
    iE_RITMO_ECG: string;
    iE_DECUBITO: string;
    iE_UNID_MED_PESO: string;
    qT_ALTURA_CM: number;
    iE_UNID_MED_ALTURA: string;
    dS_UTC: string;
    dS_UTC_ATUALIZACAO: string;
    dT_LIBERACAO: string;
    iE_SITUACAO: string;
    nM_USUARIO: string;
    dS_OBSERVACAO: string;
}

interface ResponseSVMG {
    result: ISinaisVitais;
}

const useGetEndSinaisVitais = (cdPessoaFisica?: string) => {

    const { addAlert } = useContext(NotificationContext);

    return useQuery([cdPessoaFisica], async () => {
        const { result } = (await (ApiTasy.get(`SinaisVitaisMonitoracaoGeral/RecuperaDadosRecentesSVMG/${cdPessoaFisica}`))).data;
        return result;
    },
    {
       enabled: Boolean(cdPessoaFisica),
       onSuccess: () => {
        addAlert({
            message: 'Evolução adicionada com sucesso!',
            status: 'success',
        });
    },
    });
}

const useAddSinaisVitaisAtendimento = () => {

    const { addAlert } = useContext(NotificationContext);

    return useMutation( async (cD_PACIENTE: string) => {
        const { result: endSvPacient } = (await (ApiTasy.get<any,AxiosResponse<ResponseSVMG>>(`SinaisVitaisMonitoracaoGeral/RecuperaDadosRecentesSVMG/${cD_PACIENTE}`))).data;
        const { result } = (await ApiTasy.post<ISinaisVitais, AxiosResponse<ResponseSVMG>>('SinaisVitaisMonitoracaoGeral/PostSVMGComAtendimento', endSvPacient)).data;
        return result;
    },{
        onSuccess: () => {
            addAlert({
                message: 'Paciente adicionado com sucesso!',
                status: 'success',
            });
        },
        onError: () => {
            addAlert({
                message: 'Não foi possivel adicionar o Paciente',
                status: 'error',
            });
        }
    });
}

export { useGetEndSinaisVitais, useAddSinaisVitaisAtendimento }