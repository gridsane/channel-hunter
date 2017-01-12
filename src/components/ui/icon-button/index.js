import React, {PropTypes} from 'react';
import cn from 'classnames';
import Icon from 'components/ui/icon';
import styles from './icon-button.scss';

export default class IconButton extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    glyph: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['large', 'medium']),
    className: PropTypes.string,
  };

  static defaultProps = {
    size: 'medium',
  }

  render() {
    const {glyph, size, className, onClick} = this.props;

    return <button
      onClick={onClick}
      className={cn(styles.button, className, {[styles[size]]: true})}>
      <Icon glyph={glyph} size={size} />
    </button>;
  }
}
