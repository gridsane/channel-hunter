import React, {Component, PropTypes} from 'react';
import cn from 'classnames';
import Icon from '../icon/icon';
import styles from './button.scss';

export default class IconButton extends Component {
  static propTypes = {
    glyph: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    size: PropTypes.number,
    boxSize: PropTypes.number,
  }

  render() {
    const {size, boxSize, glyph, onClick, className} = this.props;
    return <button
      className={cn(styles.icon, className)}
      onClick={onClick}
      style={this.props.style}>
      <Icon size={size} boxSize={boxSize} glyph={glyph} />
    </button>;
  }
}
