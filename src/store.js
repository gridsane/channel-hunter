import {compose, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers/app';
import DevTools from './devtools';
// import initialState from './initialState';

const initialState = window.INITIAL_STATE || null;

const store = compose(
  applyMiddleware(thunkMiddleware),
  DevTools.instrument()
)(createStore)(reducer, initialState);

export default store;



/*

import {getChannels, getTracks} from '../utils/api';
import {toggleTracksLoading} from './tracks';
export function initChannels() {
  return async (dispatch) => {

    dispatch(toggleChannelsLoading(true));
    dispatch(toggleTracksLoading(true));

    const channels = await getChannels();

    channels.forEach(async (channel) => {

      if (channel.source == 'vk') {
        dispatch(addChannel(channel));
        dispatch(toggleChannel(channel.id));
        const tracks = await getTracks(channel.source, channel.id);
        if (!tracks.error) {
          dispatch({type: 'TRACKS_ITEMS_ADD', items: tracks});
        }
      }

      dispatch(toggleChannelsLoading(false));
      dispatch(toggleTracksLoading(false));

    });
  };
}

 */
