import * as types from './actions-types';
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

        if (channel.isLoaded && channel.isEnabled) {
          dispatch(loadChannelTracks(channel));
        } else if ((channel.fetchedAt || 0) < lastUpdated) {
          dispatch(setChannelProps(channel.id, {hasUpdates: true}));
        }

        resolve();
      }));

    await Promise.all(promises);

    dispatch(setFeedChannelsLoading(false));
  };
}

export function loadChannelTracks(channel, nextPage = false) {
  return async (dispatch) => {
    dispatch(setChannelLoading(channel.id, true));
    const pageData = nextPage && channel.nextPage ? channel.nextPage : {};
    const tracks = await api.getTracks(channel.source, channel.originalId, pageData);

    dispatch(addTracks(tracks.list));
    dispatch(setChannelProps(channel.id, {
      isLoaded: true,
      isLoading: false,
      prevFetchedAt: channel.fetchedAt || null,
      fetchedAt: Math.floor(Date.now() / 1000),
      hasUpdates: false,
      nextPage: tracks.nextPage,
    }));
  };
}

export function loadMoreTracks() {
  return async (dispatch, getState) => {
    getState().feed.channels.forEach((channel) => {
      if (channel.isEnabled) {
        dispatch(loadChannelTracks(channel, true));
      }
    });
  };
}

export function setChannelEnabled(channel, isEnabled) {
  return (dispatch) => {
    dispatch(setChannelProps(channel.id, {isEnabled}));

    if (!isEnabled || (channel.isLoaded && !channel.hasUpdates)) {
      return;
    }

    dispatch(loadChannelTracks(channel));
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
