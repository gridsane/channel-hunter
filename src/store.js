import {compose, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers/app';
import {persistStore, autoRehydrate} from 'redux-persist';
import {loadChannelTracks} from './actions/channels';

const devTools = getWindowProp('devToolsExtension', () => x => x);
const initialState = getWindowProp('INITIAL_STATE');

const store = compose(
  autoRehydrate(),
  applyMiddleware(thunkMiddleware),
  devTools()
)(createStore)(reducer, initialState);

persistStore(store, {
  whitelist: ['channels'],
}, () => {

  store.getState().channels.items.filter((channel) => {
    return channel.isEnabled;
  }).forEach((channel) => {
    store.dispatch(loadChannelTracks(channel));
  });

});

export default store;

function getWindowProp(prop, defaultValue = null) {
  return typeof window === 'object' && window[prop] !== 'undefined'
    ? window[prop]
    : defaultValue;
}
