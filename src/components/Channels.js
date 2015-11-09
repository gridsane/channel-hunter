import React, {Component, PropTypes} from 'react';
import {curried} from '../utils/common';
import {List, ListItem, ListLabel, Avatar} from './common';

export default class Channels extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    picked: PropTypes.array.isRequired,
    onToggle: PropTypes.func.isRequired,
  }

  render() {
    let channels = this.props.list.map((channel) => {
      return <ListItem
        key={channel.id}
        primaryText={channel.name}
        secondaryText={this.renderTags(channel.tags)}
        leftElement={<Avatar url={channel.image} />}
        rightIcon={this._isPicked(channel.id) ? "check" : null}
        onClick={curried(this.props.onToggle, channel)} />;
    });

    return <List>
      <ListLabel text="Your channels" icon="settings" />
      {channels}
    </List>;
  }

  renderTags(tags) {
    return tags.join(', ');
  }

  _isPicked(channelId) {
    return this.props.picked.indexOf(channelId) != -1;
  }

}
