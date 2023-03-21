import React from 'react';
import ReactDOM from 'react-dom/client';
import './static/index.css';
// @ts-expect-error
import { App } from './App.tsx';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
