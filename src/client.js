import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, IndexRoute, Route, hashHistory} from 'react-router';
import Landing from './components/landing/landing-container';
import Application from './components/application/application-container';
import Feed from './components/feed/feed-container';
import Discover from './components/discover/discover-container';
import store from './store';

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={Landing} />
        <Route path="/app" component={Application}>
          <IndexRoute component={Feed} />
          <Route path="/app/discover" component={Discover} />
        </Route>
      </Router>
    </Provider>
  </div>,
  document.getElementById('root')
);
