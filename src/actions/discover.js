import * as types from './actionsTypes';
import * as api from '../api/browser';
import {addFeedChannel} from './feed';
import {debounce} from '../utils';

export function setChannels(channels) {
  return {type: types.DISCOVER_SET_CHANNELS, channels};
}

export function setLoading(isLoading) {
  return {type: types.DISCOVER_SET_LOADING, isLoading};
}

export function setError(error) {
  return {type: types.DISCOVER_SET_ERROR, error};
}

export function setTags(tags) {
  return {type: types.DISCOVER_SET_TAGS, tags};
}

export function loadTags() {
  return async (dispatch) => {
    const tags = await api.getChannelsTags();
    dispatch(setTags(Object.keys(tags)));
  };
}

export function addChannel(url) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const channel = await api.addChannel(url);
    if (channel && !channel.error) {
      dispatch(setChannels([channel]));
      dispatch(addFeedChannel(channel));
    } else {
      dispatch(setError(
        channel && channel.error
          ? channel.error
          : 'Unknown error'
      ));
    }
  };
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

