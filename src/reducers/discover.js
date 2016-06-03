import {
  DISCOVER_SET_CHANNELS,
  DISCOVER_SET_LOADING,
} from '../actions/actionsTypes';
import update from 'react-addons-update';

const initialState = {
  channels: [],
  isLoading: false,
};

const handlers = {
  [DISCOVER_SET_CHANNELS]: (state, action) => {
    return update(state, {
      channels: {$set: action.channels},
      isLoading: {$set: false},
    });
  },
  [DISCOVER_SET_LOADING]: (state, action) => {
    return update(state, {
      isLoading: {$set: action.isLoading},
    });
  },
};

export default function discover(state = initialState, action) {
  return handlers[action.type] && handlers[action.type](state, action) || state;
}
