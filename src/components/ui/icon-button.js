import Radium from 'radium';
import Color from 'color';
import React, {Component, PropTypes} from 'react';
import Icon from './icon';

@Radium
export default class IconButton extends Component {

  static propTypes = {
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    size: PropTypes.number,
    boxSize: PropTypes.number,
  }

  render() {
    const {size, boxSize, children, onClick} = this.props;
    return <button
      style={this.getStyle()}
      onClick={onClick}>
      <Icon size={size} boxSize={boxSize} style={{color: this._getIconColor()}}>
        {children}
      </Icon>
    </button>;
  }

  _getIconColor() {
    const style = this.props.style || {color: '#fff'};
    return style.color ? style.color : '#fff';
  }

  getStyle() {
    return {
      display: 'inline-block',
      position: 'relative',
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
      margin: 0,
      padding: 0,
      cursor: 'pointer',
      borderRadius: '50%',

      ':hover': {
        backgroundColor: Color(this._getIconColor()).alpha(.1).rgbString(),
      },

      ...this.props.style,
    };
  }
}
