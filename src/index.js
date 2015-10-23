import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers/app';
import React from 'react';
import ReactDOM from 'react-dom';
import initStore from './initStore';
import {Provider} from 'react-redux';
import Application from './components/Application';

const createStoreWithMiddleWare = applyMiddleware(
  thunkMiddleware
)(createStore);

let store = createStoreWithMiddleWare(reducer);
initStore(store);

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById('root')
);
