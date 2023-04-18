import * as React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import useGetAgendaQt, { IAgendaQT } from '../hook/useAgendaQt';
import { Box, CircularProgress, Divider } from '@mui/material';
import Logo from "../assets/svg/historico.svg";
import moment from 'moment';
import AlertDialogPerson, { ModalHandles } from './AlertDialogPerson';
import { useSenhaAtendimento } from '../hook/useAtendimento';
import { useAddSinaisVitaisAtendimento } from '../hook/useSinaisVitais';
import SimpleBackdrop, { LoadHandles } from './backDrop';

export default function VirtualizedList() {

  const { data, isLoading } = useGetAgendaQt();

  const AlertDialogPersonRef = React.useRef<ModalHandles>(null);
  const SimpleBackdropRef = React.useRef<LoadHandles>(null);

  const [selectedItem, setSelectedItem] = React.useState<IAgendaQT>();

  const { mutateAsync } = useSenhaAtendimento();
  const { mutateAsync: mutateAsyncAtendimento } = useAddSinaisVitaisAtendimento();

  const gerarAtendimento = async () => {
    if (selectedItem) {
      SimpleBackdropRef.current?.handleOpen();
      try {
        const result = await mutateAsyncAtendimento(selectedItem?.cD_PESSOA_FISICA);
        await mutateAsync({
          prioridade: 2,
          servico: 3,
          unidade: 1,
          cliente: {
            documento: result.nR_ATENDIMENTO.toString(),
            nome: result.nM_PESSOA_FISICA,
          },
        })
      } catch (error) {
        SimpleBackdropRef.current?.handleClose();
      }finally{
        SimpleBackdropRef.current?.handleClose();
      }
    }
  }

  const RenderItem = ({ item, index, refModalAlert }: { item: IAgendaQT, index: number, refModalAlert: React.RefObject<ModalHandles> }) => {
    return (
      <ListItemButton key={index} onClick={() => {
        setSelectedItem(item);
        refModalAlert.current?.handleClickOpen(item.nM_PESSOA_FISICA);
      }}>
        <ListItemAvatar>
          <Logo />
        </ListItemAvatar>
        <ListItemText
          primary={
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                component="span"
                variant="body2"
                color="#ffff"
              >
                Paciente:
              </Typography>
              <Typography
                component="span"
                variant="body2"
                color="#ffff"
              >
                {item.nM_PESSOA_FISICA}
              </Typography>
            </div>
          }
          secondary={
            <div style={{ display: 'flex' }}>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="#ffff"
              >
                {`Data de nascimento: ${moment(item.dT_NASCIMENTO).format('DD-MM-YYYY')}`}
              </Typography>
            </div>
          }
        />
      </ListItemButton>
    );
  }

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 400,
        bgcolor: 'tranparent',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 380,
        '& ul': { padding: 0 },
      }}
    >
      {
        isLoading ?
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </Box>
          :
          data ?
            data?.map((item, index) => (
              <div>
                <Divider />
                <RenderItem item={item} index={index} refModalAlert={AlertDialogPersonRef} />
                <Divider />
              </div>
            ))
            :
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography>Nenhuma consulta encontrada!</Typography>
            </Box>
      }
      <AlertDialogPerson ref={AlertDialogPersonRef} onpress={() => {
        AlertDialogPersonRef.current?.handleClose();
        gerarAtendimento();
      }} />
      <SimpleBackdrop ref={SimpleBackdropRef} activeModal={false} />
    </List>
  );
}