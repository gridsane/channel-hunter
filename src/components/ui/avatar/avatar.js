import React, {Component} from 'react';
import cn from 'classnames';
import styles from './avatar.scss';

export default class Avatar extends Component {
  static propTypes = {
    url: React.PropTypes.string.isRequired,
  }

  render() {
    return <span
      className={cn(styles.avatar, this.props.className)}
      style={{...this.props.style, backgroundImage: `url(${this.props.url})`}} />;
  }
}
