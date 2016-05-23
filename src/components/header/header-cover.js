import React, {Component, PropTypes} from 'react';
import styles from './header.scss';

export default class HeaderCover extends Component {
  static propTypes = {
    url: PropTypes.string,
  }

  static defaultProps = {
    url: null,
  }

  render() {
    const {url} = this.props;

    return <div className={styles.cover}>
        <div className={styles.coverImage} style={{
          backgroundImage: url ? `url(${url})` : 'none',
        }} />
    </div>;
  }
}
