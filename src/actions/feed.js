import * as types from './actionsTypes';
import * as api from '../api/browser';

export function addFeedChannels(channels) {
  return {type: types.FEED_ADD_CHANNELS, channels};
}

export function addFeedChannel(channel) {
  return addFeedChannels([channel]);
}

export function removeFeedChannels(channelsIds) {
  return {type: types.FEED_REMOVE_CHANNELS, channelsIds};
}

export function removeFeedChannel(channelId) {
  return removeFeedChannels([channelId]);
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

export function setFeedChannelsLoading(isLoading) {
  return {type: types.FEED_SET_LOADING_CHANNELS, isLoading};
}

export function refreshFeedChannels(channels) {
  return async (dispatch) => {
    dispatch(setFeedChannelsLoading(true));

    const promises = channels
      .filter((channel) => !channel.hasUpdates)
      .map((channel) => new Promise(async (resolve) => {
        const lastUpdated = await api.getChannelLastUpdated(channel.source, channel.originalId);
        if ((channel.fetchedAt || 0) < lastUpdated) {
          dispatch(setChannelProps(channel.id, {
            hasUpdates: true,
          }));
        }

        resolve();
      }));

    await Promise.all(promises);

    dispatch(setFeedChannelsLoading(false));
  };
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
      hasUpdates: false,
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
      dispatch(selectNextTrack());
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
