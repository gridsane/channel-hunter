import {
  CHANNELS_ADD,
  CHANNELS_REMOVE,
  CHANNELS_LOADING,
  CHANNELS_ITEM_PROPS,
} from '../actions/actionsTypes';
import {REHYDRATE} from 'redux-persist/constants';
import update from 'react-addons-update';

const initialState = {
  isLoading: false,
  items: [],
};

export default function player(state = initialState, action) {
  return handlers[action.type] && handlers[action.type](state, action) || state;
}

const handlers = {

  [CHANNELS_ADD]: (state, action) => {
      return update(state, {
        items: {$push: action.channels},
      });
  },

  [CHANNELS_REMOVE]: (state, action) => {
    return update(state, {
      items: {$splice: state.items.reduce(function (spliceArgs, item, index) {
        if (item.id === action.channelId) {
          spliceArgs.push([index, 1]);
        }

        return spliceArgs;
      }, [])},
    });
  },

  [CHANNELS_LOADING]: (state, action) => {
    return update(state, {
      isLoading: {$set: action.isLoading},
    });
  },

  [CHANNELS_ITEM_PROPS]: (state, action) => {
    return update(state, {
      items: {$set: state.items.map((item) => {
        if (item.id === action.channelId) {
          item = {...item, ...action.props};
        }

        return item;
      })},
    });
  },

  [REHYDRATE]: (state, action) => {
    let items = action.payload.channels.items.map((item) => {
      return {
        ...item,
        isLoaded: false,
        isLoading: false,
      };
    });

    const ids = items.map((x) => x.id);
    state.items.forEach((x) => {
      if (ids.indexOf(x.id) === -1) {
        items.push(x);
      }
    });

    return update(state, {
      items: {$set: items},
    });
  },

};
