import React, {Component, PropTypes} from 'react';
import {FlatButton} from '../ui';
import styles from './discover.scss';

export default class DiscoverChannel extends Component {
  static propTypes = {
    onToggle: PropTypes.func.isRequired,
    isFeedChannel: PropTypes.bool,
  };

  render() {
    const {name, image, imageLarge, isFeedChannel} = this.props;

    return <div className={styles.channel} style={{
        backgroundImage: `url(${imageLarge || image})`,
      }}>
      <div className={styles.channelImage}></div>
      <div className={styles.channelContent}>
        <h3 className={styles.channelTitle}>{name}</h3>
        <p className={styles.channelTags}>#tag1 #tag2 #tag3</p>
      </div>
      <FlatButton
        label={isFeedChannel ? 'remove' : 'add to feed'}
        onClick={this._toggle}
        primary
        small
        className={styles.channelAction} />
    </div>;
  }

  _toggle = () => {
    this.props.onToggle(Object.keys(this.props).reduce((acc, key) => {
      if (key !== 'isFeedChannel' && typeof(this.props[key]) !== 'function') {
        acc[key] = this.props[key];
      }

      return acc;
    }, {}));
  }
}
