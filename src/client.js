import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Application from './components/Application';
import store from './store';
import DevTools from './devtools';

ReactDOM.render(
  <div>
    <Provider store={store}>
      <div>
        <Application />
        <DevTools />
      </div>
    </Provider>
  </div>,
  document.getElementById('root')
);
