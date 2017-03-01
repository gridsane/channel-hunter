import React, {PropTypes} from 'react';
import cn from 'classnames';
import IconButton from 'components/ui/icon-button';
import styles from './discover.scss';

export default class Discover extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  render() {
    const {onClose} = this.props;

    return (
      <div className={cn(styles.root, {[styles.rootVisible]: this.props.visible})}>
        <input
          placeholder="Search"
          type="text"
          className={cn(styles.search)}/>
        <IconButton
          glyph="close"
          onClick={onClose}
          className={cn(styles.close)}/>

      </div>
    );
  }
}
