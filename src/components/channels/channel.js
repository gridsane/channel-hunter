import React, {PropTypes} from 'react';
import cn from 'classnames';
import Avatar from 'components/ui/avatar';
import IconButton from 'components/ui/icon-button';
import styles from './channels.scss';

export default class Channel extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onToggle: PropTypes.func.isRequired,
    onRemove: PropTypes.func,
    image: PropTypes.string,
    isEnabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    hasUpdates: PropTypes.bool,
  }

  static defaultProps = {
    isEnabled: false,
    isLoading: false,
    hasUpdates: false,
    image: null,
  }

  render() {
    const {name, image, isEnabled} = this.props;

    return (
      <li className={cn(styles.channel, {[styles.channelEnabled]: isEnabled})} onClick={this._toggle}>
        <Avatar url={image} className={styles.avatar} />
        <span className={styles.name}>{name}</span>
        {this._hasRemove() && <IconButton
          glyph="remove"
          size="medium"
          onClick={this._remove}
          className={styles.remove}/>}
      </li>
    );
  }

  _toggle = () => {
    this.props.onToggle(this.props);
  }

  _remove = e => {
    e.stopPropagation();
    this.props.onRemove(this.props.id);
  }

  _hasRemove() {
    return typeof this.props.onRemove === 'function';
  }
}
