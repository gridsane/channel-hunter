import React, {Component, PropTypes} from 'react';
import {curried} from '../utils/common';
import {colors} from '../utils/styles';
import {List, ListItem, ListLabel, Avatar, Icon, Loader} from './common';

export default class Channels extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    onToggle: PropTypes.func.isRequired,
  }

  render() {
    const styles = this.getStyles();

    const channels = this.props.list.map((channel) => {
      return <ListItem
        key={channel.id}
        style={styles.channel}
        primaryText={channel.name}
        secondaryText={this._renderTags(channel.tags)}
        leftElement={<Avatar url={channel.image} />}
        rightElement={this._renderRightElement(channel)}
        rightElementHeight={24}
        onClick={curried(this.props.onToggle, channel)} />;
    });

    return <div>
      <ListLabel text="Your channels" />
      <List>{channels}</List>
    </div>;
  }

  _renderTags(tags) {
    if (!tags) {
      return null;
    }

    return tags.join(', ');
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
