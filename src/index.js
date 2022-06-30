import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import './index.css';
import Main from './components/Main';
import { render } from 'react-dom';

const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  rootElement
);

