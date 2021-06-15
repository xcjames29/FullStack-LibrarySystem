import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import './index.css';
import HistoryProvider from "./interceptors/setupInterceptors"





ReactDOM.render(
<HistoryProvider>  <Main /> </HistoryProvider>,document.getElementById('root'));

