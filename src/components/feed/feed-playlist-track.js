import React, {Component, PropTypes} from 'react';
import {Avatar, ListItem, Icon} from '../ui';
import {formatDuration} from '../../utils/common';
import cn from 'classnames';
import styles from './feed.scss';

export default class PlaylistTrack extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    artist: PropTypes.string,
    duration: PropTypes.number,
    error: PropTypes.string,
    isCurrent: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    duration: null,
    isCurrent: false,
    error: null,
  }

  render() {
    return <ListItem
      onClick={this._click}
      primaryText={this._renderPrimaryText()}
      leftElement={this._renderIcon()}
      rightElement={this._renderChannelImage()}
      leftElementHeight={24}
      rightElementHeight={32}
      className={cn(styles.track, {
        [styles.trackCurrent]: this.props.isCurrent,
      })} />;
  }

  _renderPrimaryText() {
    const {title, artist, duration} = this.props;

    return <span>
      {title}
      {artist
        ? <span className={styles.trackArtist}> by {artist}</span>
        : null}
      <span className={styles.trackDuration}>{formatDuration(duration)}</span>
    </span>;
  }

  _renderChannelImage() {
    const {channelImage} = this.props;

    if (!channelImage) {
      return null;
    }

    return <Avatar
      url={channelImage}
      size={32}
      className={styles.trackChannelImage} />;
  }

  _renderIcon() {
    const {error, isCurrent} = this.props;

    if (error === null && !isCurrent) {
      return null;
    }

    return <Icon
      glyph={error ? 'error' : 'play_arrow'}
      size={24}
      className={cn({
        [styles.trackCurrentIcon]: isCurrent,
        [styles.trackErrorIcon]: error !== null,
      })} />;
  }

  _click = (event) => {
    this.props.onClick(this.props.id, event);
  }
}
