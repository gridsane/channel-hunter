import React, {Component, PropTypes} from 'react';
import {curried} from '../../utils/common';
import {colors} from '../../utils/styles';
import {List, ListItem, ListLabel, Avatar, Icon, Loader} from '../ui';

export default class FeedChannels extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    onToggle: PropTypes.func.isRequired,
  };

  render() {
    const styles = this.getStyles();

    const channels = this.props.list.map((channel) => {
      return <ListItem
        key={channel.id}
        style={styles.channel}
        primaryText={channel.name}
        leftElement={<Avatar size={32} url={channel.image} />}
        leftElementHeight={32}
        rightElement={this._renderRightElement(channel)}
        rightElementHeight={24}
        height={48}
        onClick={curried(this.props.onToggle, channel)} />;
    });

    return <div style={this.props.style}>
      <ListLabel text="Your channels" />
      <List>{channels}</List>
    </div>;
  }

  _renderRightElement(channel) {
    if (channel.isLoading) {
      return <Loader size={24} color={colors.primaryText} />;
    }

    return channel.isEnabled ? <Icon size={24}>check</Icon> : null;
  }

  getStyles() {
    return {

      channel: {
        fontSize: 14,
      },

    };
  }
}
