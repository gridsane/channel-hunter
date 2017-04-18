import React, {PropTypes} from 'react';
import Channel from './channel';
import style from './channels.scss';

export default class Channels extends React.PureComponent {
  static propTypes = {
    channels: PropTypes.array.isRequired,
    onToggleChannel: PropTypes.func.isRequired,
    onRemoveChannel: PropTypes.func,
  }

  render() {
    const {channels, onToggleChannel, onRemoveChannel} = this.props;

    return <ul className={style.root}>
      {channels.map(channel => (
        <Channel
          key={channel.id}
          {...channel}
          onToggle={onToggleChannel}
          onRemove={onRemoveChannel} />
      ))}
    </ul>;
  }
}
