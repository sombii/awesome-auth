import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "@material-ui/core";
import {customTheme} from "./theme";

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={customTheme}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
