import {
  DISCOVER_SET_VISIBLE,
  DISCOVER_SET_CHANNELS,
  DISCOVER_SET_LOADING,
  DISCOVER_SET_TAGS,
} from '../actions/actions-types';
import update from 'react-addons-update';

const initialState = {
  visible: false,
  channels: [],
  tags: [],
  isLoading: false,
};

const handlers = {
  [DISCOVER_SET_VISIBLE]: (state, action) => {
    return update(state, {visible: {$set: action.visible}});
  },
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
  [DISCOVER_SET_TAGS]: (state, action) => {
    return update(state, {
      tags: {$set: action.tags},
    });
  },
};

export default function discover(state = initialState, action) {
  return handlers[action.type] && handlers[action.type](state, action) || state;
}
