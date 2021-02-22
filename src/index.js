import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter } from "react-router-dom";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import "./i18n";
import App from './App';


ReactDOM.render(

  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
);

