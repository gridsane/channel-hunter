import React, {Component, PropTypes} from 'react';
import {curried} from '../utils/common';
import {List, ListItem, ListLabel, Avatar, Icon, Loader} from './common';

export default class Channels extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    onToggle: PropTypes.func.isRequired,
  }

  render() {
    const channels = this.props.list.map((channel) => {
      return <ListItem
        key={channel.id}
        primaryText={channel.name}
        secondaryText={this._renderTags(channel.tags)}
        leftElement={<Avatar url={channel.image} />}
        rightElement={this._renderRightElement(channel)}
        onClick={curried(this.props.onToggle, channel)} />;
    });

    return <List>
      <ListLabel text="Your channels" icon="settings" />
      {channels}
    </List>;
  }

  _renderTags(tags) {
    if (!tags) {
      return null;
    }

    return tags.join(', ');
  }

  _renderRightElement(channel) {
    if (channel.isLoading) {
      return <Loader size={24} />;
    }

    return channel.isEnabled ? <Icon size={24}>check</Icon> : null;
  }

}
