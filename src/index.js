import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import thunk from 'redux-thunk';
import reducer from "./reducers/reducer.js";
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';


const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>
, document.getElementById('root'));
