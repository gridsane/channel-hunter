import {
  TRACKS_ITEMS_ADD,
  TRACKS_TOGGLE_PLAYING,
  TRACKS_TOGGLE_LOADING,
  TRACKS_SELECT,
} from '../actions/actionsTypes';
import update from 'react-addons-update';

let initialState = {
  selected: null,
  isPlaying: false,
  isLoading: false,
  playlist: [],
  items: {},
};

export default function tracks(state = initialState, action) {
  switch(action.type) {
    case TRACKS_ITEMS_ADD:
      let items = {};
      action.items.forEach((item) => {
        items[item.id] = item;
      });

      return update(state, {
        items: {$merge: items},
      });

    case TRACKS_SELECT:
      return update(state, {
        selected: {$set: action.item},
      });

    case TRACKS_TOGGLE_PLAYING:
      return update(state, {
        isPlaying: {$set: action.isPlaying},
      });

    case TRACKS_TOGGLE_LOADING:
      return update(state, {
        isLoading: {$set: action.isLoading},
      });

    default:
      return state;
  }
}
