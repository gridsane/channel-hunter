import * as types from './actionsTypes';
import {addTracks} from './tracks';
import * as api from '../../src/utils/api';

export function addChannels(channels) {
  return {type: types.CHANNELS_ADD, channels};
}

export function removeChannel(channelId) {
  return {type: types.CHANNELS_REMOVE, channelId};
}

export function setChannelsLoading(isLoading) {
  return {type: types.CHANNELS_LOADING, isLoading};
}

export function setChannelProps(channelId, props) {
  return {type: types.CHANNELS_ITEM_PROPS, channelId, props};
}

export function setChannelLoading(channelId, isLoading) {
  return setChannelProps(channelId, {isLoading});
}

export function setChannelLoaded(channelId, isLoaded) {
  return setChannelProps(channelId, {isLoaded});
}

export function setChannelEnabled(channel, isEnabled) {
  return async (dispatch) => {

    if (!isEnabled || channel.isLoaded) {
      dispatch(setChannelProps(channel.id, {isEnabled}));
      return;
    }

    dispatch(setChannelLoading(channel.id, true));

    const tracks = await api.getTracks(channel.source, channel.id);
    dispatch(addTracks(tracks));

    dispatch(setChannelProps(channel.id, {
      isEnabled: true,
      isLoaded: true,
      isLoading: false,
    }));
  };
}
