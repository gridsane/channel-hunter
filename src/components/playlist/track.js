import React, {PropTypes} from 'react';
import cn from 'classnames';
import Icon from 'components/ui/icon';
import Avatar from 'components/ui/avatar';
import styles from './playlist.scss';

export default class Track extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    artist: PropTypes.string,
    cover: PropTypes.string,
    channelImage: PropTypes.string,
  }

  render() {
    const {title, artist, cover, channelImage, isSelected} = this.props;

    return <li
      onClick={this._select}
      className={cn(styles.track, {[styles.trackSelected]: isSelected})}>
      <Icon glyph="play_arrow" className={styles.trackPlay} />
      <div className={styles.trackName}>
        {title}{artist ? ' ' + artist : null}
      </div>
      <Avatar url={cover || channelImage} className={styles.trackChannel} />
    </li>;
  }

  _select = () => {
    this.props.onSelect(this.props.id);
  }
}
