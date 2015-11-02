import React, {Component} from 'react';
import {connect} from 'react-redux';
import {colors} from '../utils/styles';
import {List, ListItem, ListLabel, Avatar} from './common';

@connect((state) => {
  return {
    channels: state.channels.items
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
        rightIcon="check"
      />
    })

    return <List style={styles.container}>
      <ListLabel text="Your channels" icon="settings" />
      {channels}
    </List>
  }

  renderTags(tags) {
    return tags.join(', ')
  }

  getStyles() {
    return {

      container: {
      },

    }
  }
}
