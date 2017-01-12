import React, {PropTypes} from 'react';
import cn from 'classnames';
import styles from './discover.scss';

export default class Discover extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
  }

  render() {
    return (
      <div className={cn(styles.root, {[styles.rootVisible]: this.props.visible})}>
        discover
      </div>
    );
  }
}
