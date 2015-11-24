import {
  CHANNELS_ADD,
  CHANNELS_REMOVE,
  CHANNELS_TOGGLE,
  CHANNELS_LOADING,
} from '../actions/actionsTypes';
import update from 'react-addons-update';

let initialState = {
  isLoading: false,
  items: [],
  picked: [],
};

export default function player(state = initialState, action) {
  switch(action.type) {
    case CHANNELS_ADD:
      let pick = {};

      if (action.isPicked) {
        pick.picked = {$push: [action.channel.id]};
      }

      return update(state, {
        items: {$push: [action.channel]},
        ...pick,
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

    case CHANNELS_LOADING:
      return update(state, {
        isLoading: {$set: action.isLoading},
      });

    default:
      return state;
  }
}
