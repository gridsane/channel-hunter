import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {StickyContainer, Sticky} from 'react-sticky';
import {getTrackById, getSortedPlaylist} from '../../reducers/feed';
import {setCurrentTrack, selectNextTrack, setTrackError, loadMoreTracks} from '../../actions/feed';
import Controls from 'components/controls';
import Playlist from 'components/playlist';
import Button from 'components/ui/button';
import styles from './player.scss';

export class Player extends React.PureComponent {
  static propTypes = {
    isShuffle: PropTypes.bool.isRequired,
    tracks: PropTypes.array.isRequired,
    currentTrack: PropTypes.object,
  }

  state = {
    isPlaying: false,
  }

  render() {
    const {tracks, currentTrack} = this.props;

    return <div className={styles.root}>
      <StickyContainer className={styles.wrapper}>
        <Sticky style={{zIndex: 2}}>
          <Controls
            isPlaying={this.state.isPlaying}
            track={currentTrack}
            onTogglePlay={this._togglePlay}
            onNext={this._selectNextTrack}
            onError={this._resolveError} />
        </Sticky>
        <Playlist
          tracks={tracks}
          onSelect={this._selectTrack}
          currentTrackId={currentTrack ? currentTrack.id : null} />
        {Boolean(tracks.length) && <Button
          onClick={this._loadMore}
          label="Load more"
          className={styles.loadMore} />}
      </StickyContainer>
    </div>;
  }

  _togglePlay = () => {
    this.setState({isPlaying: !this.state.isPlaying});
  }

  _selectTrack = (trackId) => {
    this.props.dispatch(setCurrentTrack(trackId));
  }

  _selectNextTrack = () => {
    this.props.dispatch(selectNextTrack());
  }

  _loadMore = () => {
    this.props.dispatch(loadMoreTracks());
  }

  _resolveError = () => {
    const {dispatch, currentTrack} = this.props;
    if (currentTrack && currentTrack.id) {
      dispatch(setTrackError(currentTrack.id, 'error'));
      this._selectNextTrack();
    }
  }
}

export function mapToProps(state) {
  const {feed} = state;
  const channelsById = feed.channels.reduce((acc, c) => {
    acc[c.id] = c;
    return acc;
  }, {});

  return {
    currentTrack: getTrackById(feed, feed.currentTrackId),
    isShuffle: feed.tracksSort.prop === '_seed',
    tracks: getSortedPlaylist(feed).map((t) => {
      return {...t, channelImage: channelsById[t.channelId].image};
    }),
  };
}

export default connect(mapToProps)(Player);
