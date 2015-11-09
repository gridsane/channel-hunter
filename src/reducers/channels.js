import {
  CHANNELS_ADD,
  CHANNELS_REMOVE,
  CHANNELS_TOGGLE,
} from '../actions/actionsTypes';
import update from 'react-addons-update';

let initialState = {
  items: [],
  picked: [],
};

export default function player(state = initialState, action) {
  switch(action.type) {
    case CHANNELS_ADD:
      return update(state, {
        items: {$push: [action.channel]},
      });

    case CHANNELS_REMOVE:
      let spliceArgs = [];

      state.items.forEach(function (item, index) {
        if (item.id === action.channelId) {
          spliceArgs.push([index, 1]);
        }
      });

      return update(state, {
        items: {$splice: spliceArgs},
      });

    case CHANNELS_TOGGLE:
      let index = state.picked.indexOf(action.channelId);
      let operation = null;

      if (index === -1) {
        operation = {$push: [action.channelId]};
      } else {
        operation = {$splice: [[index, 1]]};
      }

      return update(state, {
        picked: operation,
      });

    default:
      return state;
  }
}
