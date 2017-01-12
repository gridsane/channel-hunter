import React, {PropTypes} from 'react';
import Track from './track';
import styles from './playlist.scss';

export default class Playlist extends React.Component {
  static propTypes = {
    tracks: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    currentTrackId: PropTypes.string,
  }

  render() {
    const {tracks, currentTrackId, onSelect} = this.props;

    return <ul className={styles.root}>
      {tracks.map(track => (
        <Track
          key={track.id}
          onSelect={onSelect}
          isSelected={currentTrackId === track.id}
          {...track} />
      ))}
    </ul>;
  }
}
