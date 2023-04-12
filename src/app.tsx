import React from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as ReactDOM from 'react-dom';
import { NotificationProvider } from './contexts/notificationContext';
import CustomizedSnackbars from './components/Alert';
import Menu from './components/menu';

const queryClient = new QueryClient();

function render() {
    ReactDOM.render(
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <NotificationProvider>
                    <Menu />
                    <CustomizedSnackbars />
                </NotificationProvider>
            </div>
        </QueryClientProvider>
        , document.body);
}

render();