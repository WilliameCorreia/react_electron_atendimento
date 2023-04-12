import { useMutation } from "@tanstack/react-query";
import ApiAtendimento from "../services/ApiAtendimento";
import { refreshTokenAtendimento } from "../services/ApiAtendimento";
import { useContext } from "react";
import NotificationGlobalContext from "../contexts/notificationContext";

interface requestAtendimento {
    servico: number;
    prioridade: number;
    cliente: {
        nome: string;
        documento: string;
    };
    unidade: number;
}

const useSenhaAtendimento = () => {

    const { addAlert } = useContext(NotificationGlobalContext);

    return useMutation(
        async (item: requestAtendimento) => {
            const token = await refreshTokenAtendimento();
            console.log(token);
            const result = (
                await ApiAtendimento.post('distribui', item, {
                    headers: { Authorization: `Bearer ${token}` },
                })
            ).data;
            console.log(result);
            return result;
        },
        {
            onSuccess: () => {
                addAlert({
                    message: 'Paciente adicionado a painel de atendimento!',
                    status: 'success',
                });
            },
            onError: () => {
                addAlert({
                    message: 'Não foi possivel adicionar o Paciente',
                    status: 'error',
                });
            }
        }
    );
}

export {useSenhaAtendimento}