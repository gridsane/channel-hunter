import React, {PropTypes} from 'react';
import cn from 'classnames';
import styles from './avatar.scss';

export default class Avatar extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    url: PropTypes.string,
  }

  render() {
    const {url, className} = this.props;

    return <span
      className={cn(styles.avatar, className)}
      style={{backgroundImage: url ? `url(${url})` : null}} />;
  }
}
