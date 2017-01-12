import React, {PropTypes} from 'react';
import cn from 'classnames';
import Avatar from 'components/ui/avatar';
import styles from './channels.scss';

export default class Channel extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    isEnabled: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    hasUpdates: PropTypes.bool,
    onToggle: PropTypes.func.isRequired,
  }

  render() {
    const {name, image, isEnabled} = this.props;

    return (
      <li className={cn(styles.channel, {[styles.channelEnabled]: isEnabled})} onClick={this._toggle}>
        <Avatar url={image} className={styles.avatar} />
        {name}
      </li>
    );
  }

  _toggle = () => {
    this.props.onToggle(this.props);
  }
}
