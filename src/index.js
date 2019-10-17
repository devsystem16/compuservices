import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "./Components/TablaDatos.css";
import * as serviceWorker from './serviceWorker';
 
import "../node_modules/izitoast/dist/css/iziToast.min.css";


ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
