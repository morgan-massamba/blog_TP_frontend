import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import App from './App';
import { toast } from 'react-toastify';

//DAY JS
dayjs.locale('fr');

//INTERCEPTORS AXIOS
axios.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('accessToken')
            ? JSON.parse(localStorage.getItem('accessToken'))
            : null;

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (
            error.response?.status === 403 &&
            error.response?.data?.message === 'jwt invalid'
        ) {
            toast.error('Vous avez été deconnecter de nos serveur', {
                hideProgressBar: true,
                autoClose: 2000,
            });

            localStorage.removeItem('accessToken');

            setTimeout(() => {
                window.location = '/';
            }, 2000);
        }
        return Promise.reject(error);
    }
);

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
