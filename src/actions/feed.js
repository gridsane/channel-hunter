import * as types from './actionsTypes';
import * as api from '../api/browser';

export function addChannels(channels) {
  return {type: types.FEED_ADD_CHANNELS, channels};
}

export function removeChannels(channelsIds) {
  return {type: types.FEED_REMOVE_CHANNELS, channelsIds};
}

export function setChannelProps(channelId, props) {
  return {type: types.FEED_SET_PROPS_CHANNEL, channelId, props};
}

export function setChannelLoading(channelId, isLoading) {
  return setChannelProps(channelId, {isLoading});
}

export function setChannelLoaded(channelId, isLoaded) {
  return setChannelProps(channelId, {isLoaded});
}

export function loadChannelTracks(channel) {
  return async (dispatch) => {
    dispatch(setChannelLoading(channel.id, true));

    const tracks = await api.getTracks(channel.source, channel.originalId);

    dispatch(addTracks(tracks));
    dispatch(setChannelProps(channel.id, {
      isLoaded: true,
      isLoading: false,
      prevFetchedAt: channel.fetchedAt || null,
      fetchedAt: Math.floor(Date.now() / 1000),
    }));
  };
}

export function setChannelEnabled(channel, isEnabled) {
  return async (dispatch) => {
    if (!isEnabled || channel.isLoaded) {
      dispatch(setChannelProps(channel.id, {isEnabled}));
      return;
    }

    dispatch(loadChannelTracks(channel));

    dispatch(setChannelProps(channel.id, {
      isEnabled: true,
    }));
  };
}

export function addTracks(tracks) {
  return {type: types.FEED_ADD_TRACKS, tracks};
}

export function setCurrentTrack(trackId) {
  return {type: types.FEED_SET_CURRENT_TRACK, trackId};
}

export function selectNextTrack() {
  return {type: types.FEED_SELECT_NEXT_TRACK};
}

export function setTracksSort(prop = null, dir = null) {
  return {type: types.FEED_SET_SORT_TRACKS, prop, dir};
}

export function setTrackError(trackId, error = null) {
  return {type: types.FEED_SET_ERROR_TRACK, trackId, error};
}

export function refetchTrackOrError(track, error = null) {
  return async (dispatch) => {
    if (track.lastFetchedAt && track.lastFetchedAt >= Math.floor(Date.now() / 1000) - 60) {
      dispatch(setTrackError(track.id, error));
      return;
    }

    const updatedTracks = await api.getTrack(track);
    dispatch(addTracks(updatedTracks));
  };
}

export function loadTrack(track) {
  return async (dispatch) => {
    const tracks = await api.getTrack(track);
    dispatch(addTracks(tracks));
  };
}
