import React, {Component} from 'react';
import {connect} from 'react-redux';
import {curried} from '../utils/common';
import {colors} from '../utils/styles';
import {List, ListItem, ListLabel, Avatar} from './common';
import {toggleChannel} from '../actions/channels';

@connect((state) => {
  return {
    channels: state.channels.items,
    picked: state.channels.picked,
  }
})
export default class Channels extends Component {
  static propTypes = {
    channels: React.PropTypes.array.isRequired,
  }

  render() {
    let styles = this.getStyles();
    styles.container = Object.assign({}, styles.container, this.props.style);

    let channels = this.props.channels.map((channel) => {
      return <ListItem
        key={channel.id}
        primaryText={channel.name}
        secondaryText={this.renderTags(channel.tags)}
        leftElement={<Avatar url={channel.image} />}
        rightIcon={this._isPicked(channel.id) ? "check" : null}
        onClick={curried(::this._toggle, channel.id)} />
    });

    return <List style={styles.container}>
      <ListLabel text="Your channels" icon="settings" />
      {channels}
    </List>
  }

  renderTags(tags) {
    return tags.join(', ')
  }

  _isPicked(channelId) {
    return this.props.picked.indexOf(channelId) != -1;
  }

  _toggle(channelId) {
    this.props.dispatch(toggleChannel(channelId));
  }

  getStyles() {
    return {

      container: {
      },

    }
  }
}
