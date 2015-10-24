import {compose, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers/app';
import React from 'react';
import ReactDOM from 'react-dom';
import initStore from './initStore';
import {Provider} from 'react-redux';
import Application from './components/Application';

import { createDevTools } from 'redux-devtools';
import DockMonitor from 'redux-devtools-dock-monitor';
import LogMonitor from 'redux-devtools-log-monitor';

const DevTools = createDevTools(
  <DockMonitor defaultIsVisible={false} toggleVisibilityKey='H' changePositionKey='Q'>
    <LogMonitor />
  </DockMonitor>
);

const store = compose(
  applyMiddleware(thunkMiddleware),
  DevTools.instrument()
)(createStore)(reducer);

window.dispatch = store.dispatch;

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
