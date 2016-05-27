import React, {Component, PropTypes} from 'react';
import Channel from './feed-channels-item';
import {List, ListLabel} from '../ui';
import cn from 'classnames';
import styles from './feed.scss';

export default class FeedChannels extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    onToggle: PropTypes.func.isRequired,
  }

  render() {
    const {className, list, onToggle} = this.props;

    return <div className={cn(styles.channels, className)}>
      <ListLabel text="Your channels" />
      <List>
        {list.map((channel) => {
          return <Channel
            {...channel}
            key={channel.id}
            onToggle={onToggle} />;
        })}
      </List>
    </div>;
  }
}
