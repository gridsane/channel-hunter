import {
  CHANNELS_ADD,
  CHANNELS_REMOVE,
  CHANNELS_LOADING,
  CHANNELS_ITEM_PROPS,
} from '../actions/actionsTypes';
import update from 'react-addons-update';

let initialState = {
  isLoading: false,
  items: [],
};

export default function player(state = initialState, action) {
  switch(action.type) {
    case CHANNELS_ADD:
      return update(state, {
        items: {$push: action.channels},
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

    case CHANNELS_LOADING:
      return update(state, {
        isLoading: {$set: action.isLoading},
      });

    case CHANNELS_ITEM_PROPS:
      return update(state, {
        items: {$set: state.items.map((item) => {
          if (item.id === action.channelId) {
            item = {...item, ...action.props};
          }

          return item;
        })},
      });

    default:
      return state;
  }
}
