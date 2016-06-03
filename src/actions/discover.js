import * as types from './actionsTypes';
import * as api from '../api/browser';
import {debounce} from '../utils/common';

export function setChannels(channels) {
  return {type: types.DISCOVER_SET_CHANNELS, channels};
}

export function setLoading(isLoading) {
  return {type: types.DISCOVER_SET_LOADING, isLoading};
}

export function createSearchAction(debounceTimeout) {
  let currentRequestPromise = null;

  const debouncedSearch = debounce(async (dispatch, query) => {
    currentRequestPromise = api.searchChannels(query);

    try {
      const channels = await currentRequestPromise;
      dispatch(setChannels(channels));
    } catch (err) {
      console.error('channel search error', err);
    }
  }, debounceTimeout);

  return (query) => {
    if (currentRequestPromise) {
      currentRequestPromise.abort();
    }

    return (dispatch) => {
      dispatch(setLoading(true));
      debouncedSearch(dispatch, query);
    };
  };
}

