import {
  PLAYLIST_SELECT,
  // PLAYLIST_SELECT_NEXT,
  PLAYLIST_TOGGLE_PLAYING,
  PLAYLIST_TOGGLE_LOADING,
  PLAYLIST_ITEMS_ADD,
  PLAYLIST_ITEMS_REMOVE,
} from '../actions/actionsTypes';
import update from 'react-addons-update';

let initialState = {
  selected: null,
  isPlaying: false,
  isLoading: false,
  items: [],
};

export default function player(state = initialState, action) {
  switch(action.type) {
    case PLAYLIST_SELECT:
      return update(state, {
        selected: {$set: action.item},
      });

    case PLAYLIST_TOGGLE_PLAYING:
      return update(state, {
        isPlaying: {$set: action.isPlaying},
      });

    case PLAYLIST_TOGGLE_LOADING:
      return update(state, {
        isLoading: {$set: action.isLoading},
      });

    case PLAYLIST_ITEMS_ADD:
      return update(state, {
        items: {$push: action.items},
      });

    case PLAYLIST_ITEMS_REMOVE:
      let spliceArgs = [];
      state.items.forEach((track, index) => {
        if (track.channelId === action.channelId) {
          spliceArgs.push([index, 1]);
        }
      });

      return update(state, {
        items: {$splice: spliceArgs},
      });

    default:
      return state;
  }
}
