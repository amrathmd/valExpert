import './styles/index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import axios from 'axios';
import { AuthContextProvider } from './contexts/AuthContext';
import configureAppStore, { getPreloadedState } from './store/configureStore';

import { Homepage } from './pages';
axios.defaults.withCredentials = true;

(async () => {
    const preloadedState = getPreloadedState();

    const root = createRoot(document.getElementById('root'));

    root.render(
        <React.StrictMode>
            <ReduxProvider store={configureAppStore(preloadedState)}>
                <AuthContextProvider>
                    <Homepage />
                </AuthContextProvider>
            </ReduxProvider>
        </React.StrictMode>
    );
})();
