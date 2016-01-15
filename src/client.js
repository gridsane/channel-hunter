import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Application from './components/Application';
import store from './store';

ReactDOM.render(
  <div>
    <Provider store={store}>
      <div>
        <Application />
      </div>
    </Provider>
  </div>,
  document.getElementById('root')
);
