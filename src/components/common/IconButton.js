import React, {Component} from 'react';
import Icon from './Icon';

export default class IconButton extends Component {
  state = {
    focused: false,
  };

  render() {
    const {size, boxSize, children, onClick} = this.props;
    const styles = this.getStyles();

    return <button
      style={styles.container}
      onClick={onClick}
      onFocus={::this._focus}
      onBlur={::this._blur}>
      <Icon size={size} boxSize={boxSize} style={{color: this._getIconColor()}}>
        {children}
      </Icon>
      <div style={styles.focused} />
    </button>;
  }

  _focus() {
    this.setState({focused: true});
  }

  _blur() {
    this.setState({focused: false});
  }

  _getIconColor() {
    const style = this.props.style;
    return style ? (style.color ? style.color : '#fff') : '#fff';
  }

  getStyles() {
    const {style} = this.props;

    return {

      container: {
        display: 'inline-block',
        position: 'relative',
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        margin: 0,
        padding: 0,
        ...style,
      },

      focused: {
        position: 'absolute',
        backgroundColor: this._getIconColor(),
        opacity: .24,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: -1,
        borderRadius: '50%',
        display: this.state.focused ? 'block' : 'none',
        animation: 'IconButton-focused 1s ease-out infinite alternate',
      },

    };
  }
}
