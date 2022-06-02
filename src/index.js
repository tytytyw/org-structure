import React from 'react';
import './index.sass';
import Main from './components/Main';
import { render } from 'react-dom';

const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  rootElement
);

