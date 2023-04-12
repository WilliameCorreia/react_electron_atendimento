import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import NotificationGlobalContext from '../contexts/notificationContext';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
    const [open, setOpen] = React.useState(false);

    const { alert, removeAlert } = React.useContext(NotificationGlobalContext);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        removeAlert();
        setOpen(false);
    };

    React.useEffect(() => {
        if(alert){
            handleClick();
        }
    }, [alert]);

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alert?.status} sx={{ width: '100%' }}>
                    {alert ? alert.message : ' '}
                </Alert>
            </Snackbar>
        </Stack>
    );
}