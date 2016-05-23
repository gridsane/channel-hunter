import React, {Component, PropTypes} from 'react';
import {curried} from '../../utils/common';
import {List, ListItem, ListLabel, Avatar, Icon, Loader} from '../ui';
import cn from 'classnames';
import styles from './feed.scss';

export default class FeedChannels extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    onToggle: PropTypes.func.isRequired,
  }

  render() {
    const channels = this.props.list.map((channel) => {
      return <ListItem
        key={channel.id}
        className={styles.channelsItem}
        primaryText={channel.name}
        leftElement={<Avatar size={32} url={channel.image} />}
        leftElementHeight={32}
        rightElement={this._renderRightElement(channel)}
        rightElementHeight={24}
        height={48}
        onClick={curried(this.props.onToggle, channel)} />;
    });

    return <div className={cn(styles.channels, this.props.className)}>
      <ListLabel text="Your channels" />
      <List>{channels}</List>
    </div>;
  }

  _renderRightElement(channel) {
    if (channel.isLoading) {
      return <Loader size={24} />;
    }

    return channel.isEnabled ? <Icon size={24} glyph="check" /> : null;
  }
}
