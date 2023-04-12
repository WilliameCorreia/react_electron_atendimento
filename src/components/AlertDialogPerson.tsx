import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions, { DialogActionsProps } from '@mui/material/DialogActions';
import DialogContent, { DialogContentProps } from '@mui/material/DialogContent';
import DialogContentText, { DialogContentTextProps } from '@mui/material/DialogContentText';
import { styled } from '@mui/material';

interface Props {
  nM_PESSOA_FISICA?: string;
  onpress(): void;
}

export interface ModalHandles {
  handleClickOpen(name: string): void;
  handleClose(): void;
}

const AlertDialogPerson = React.forwardRef<ModalHandles, Props>(
  (
    {
      nM_PESSOA_FISICA = 'paciente',
      onpress,
    }: Props, 
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState(nM_PESSOA_FISICA);

  const handleClickOpen = (name: string) => {
    setName(name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useImperativeHandle(ref, () => {
    return {
      handleClickOpen,
      handleClose,
    };
  });

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContentStyled>
          <DialogContentTextStyled id="alert-dialog-description">
            { `Deseja adicionar o ${name} no atendimento ?` }
          </DialogContentTextStyled>
        </DialogContentStyled>
        <DialogActionsStyled>
          <Button onClick={handleClose}>Não</Button>
          <Button onClick={onpress} autoFocus>
            Sim
          </Button>
        </DialogActionsStyled>
      </Dialog>
    </div>
  );
  });

export default AlertDialogPerson;

const DialogContentStyled = styled(DialogContent)<DialogContentProps>(({ theme }) => ({ 
  backgroundColor: '#252a2e',
 }));

const DialogActionsStyled = styled(DialogActions)<DialogActionsProps>(({ theme }) => ({
  backgroundColor: '#252a2e',
}));

const DialogContentTextStyled = styled(DialogContentText)<DialogContentTextProps>(() => ({
  color: '#ffff'
}));