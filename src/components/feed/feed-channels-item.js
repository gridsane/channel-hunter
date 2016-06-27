import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {ListItem, Avatar, Icon, Loader} from '../ui';
import cn from 'classnames';
import styles from './feed.scss';

export default class FeedChannelsItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    isEnabled: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    hasUpdates: PropTypes.bool,
    onToggle: PropTypes.func.isRequired,
  }

  render() {
    const {name, isEnabled, isLoading} = this.props;

    return <ListItem
      primaryText={name}
      leftElement={this._renderLeftElement()}
      leftElementHeight={24}
      rightElement={this._renderRightElement()}
      rightElementHeight={24}
      height={36}
      onClick={this._toggle}
      className={cn(styles.channelsItem, {
        [styles.channelsItemEnabled]: isEnabled && !isLoading,
        [styles.channelsItemHasUpdates]: this.props.hasUpdates,
      })}/>;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  _renderLeftElement() {
    return <Avatar size={24} url={this.props.image} />;
  }

  _renderRightElement() {
    if (this.props.isLoading) {
      return <Loader size={24} />;
    }

    return this.props.isEnabled ? <Icon size={24} glyph="check" /> : null;
  }

  _toggle = () => {
    this.props.onToggle(this.props);
  }
}
