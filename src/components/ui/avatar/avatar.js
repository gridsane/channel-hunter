import React, {Component} from 'react';
import cn from 'classnames';
import styles from './avatar.scss';

export default class Avatar extends Component {
  static propTypes = {
    url: React.PropTypes.string.isRequired,
    size: React.PropTypes.number,
  }

  static defaultProps = {
    size: 40,
  }

  render() {
    const {url, size, className, style} = this.props;

    return <span
      className={cn(styles.avatar, className)}
      style={{
        ...style,
        width: size,
        height: size,
        backgroundImage: `url(${url})`,
      }} />;
  }
}
