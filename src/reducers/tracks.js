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
  items: [],
};

export default function tracks(state = initialState, action) {
  switch(action.type) {
    case TRACKS_ITEMS_ADD:
      const ids = state.items.map((item) => item.id);
      const items = action.tracks.filter((item) => -1 === ids.indexOf(item.id));

      return update(state, {
        items: {$push: items},
      });

    case TRACKS_SELECT:
      return update(state, {
        selected: {$set: action.track},
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
