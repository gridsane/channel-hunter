import {compose, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import reducer from './reducers/app';
import {persistStore, autoRehydrate} from 'redux-persist';
import {loadChannelTracks} from './actions/feed';
import {hashHistory} from 'react-router';

const devTools = getWindowProp('devToolsExtension', () => x => x);
const initialState = getWindowProp('INITIAL_STATE');

const store = compose(
  autoRehydrate(),
  applyMiddleware(thunkMiddleware, routerMiddleware(hashHistory)),
  devTools()
)(createStore)(reducer, initialState);

persistStore(store, {
  whitelist: ['feed'],
  transforms: [{
    in: (state) => {
      return {channels: state.channels};
    },
    out: (x) => x,
  }],
}, () => {
  store.getState().feed.channels.filter((c) => c.isEnabled).forEach((channel) => {
    store.dispatch(loadChannelTracks(channel));
  });
});

export default store;

function getWindowProp(prop, defaultValue = null) {
  return typeof window === 'object' && typeof(window[prop]) !== 'undefined'
    ? window[prop]
    : defaultValue;
}
