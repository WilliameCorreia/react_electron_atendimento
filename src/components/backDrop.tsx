import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
interface Props {
    activeModal?: boolean;
}
export interface LoadHandles {
    handleClose(): void;
    handleOpen(): void;
}

const SimpleBackdrop = React.forwardRef<LoadHandles, Props>(({ activeModal = false }: Props, ref) => {
    const [open, setOpen] = React.useState(activeModal);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    React.useImperativeHandle(ref, () => {
        return{
            handleClose,
            handleOpen
        };
    });

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
});

export default SimpleBackdrop;
