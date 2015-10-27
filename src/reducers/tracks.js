import {
  TRACKS_ADD,
  TRACKS_REMOVE,
} from '../actions/actionsTypes';
import update from 'react-addons-update';

let initialState = {
  items: [],
};

export default function player(state = initialState, action) {
  switch(action.type) {
    case TRACKS_ADD:
      return update(state, {
        items: {$push: action.tracks},
      });

    case TRACKS_REMOVE:
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
