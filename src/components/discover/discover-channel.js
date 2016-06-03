import React, {Component, PropTypes} from 'react';
import {FlatButton} from '../ui';
import cn from 'classnames';
import styles from './discover.scss';

export default class DiscoverChannel extends Component {
  render() {
    return <div className={styles.channel}>
      <div className={styles.channelImage} style={{
        backgroundImage: `url(${this.props.image})`,
      }}></div>
      <div className={styles.channelContent}>
        <h3 className={styles.channelTitle}>{this.props.name}</h3>
        <p className={styles.channelTags}>#tag1 #tag2 #tag3</p>
      </div>
      <FlatButton
        label="subscribe"
        onClick={()=>null}
        primary
        small
        className={styles.channelAction} />
    </div>;
  }
}
