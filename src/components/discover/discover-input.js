import React, {Component, PropTypes} from 'react';
import {Icon} from '../ui';
import {getChannelUrlSource} from '../../api/browser';
import cn from 'classnames';
import styles from './discover.scss';

export default class DiscoverInput extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
  }

  state = {
    isFocused: false,
    value: '',
    source: null,
  }

  render() {
    const {isFocused, value, source} = this.state;

    return <div className={styles.input}>
      <Icon
        glyph={source ? 'add' : 'search'}
        size={24}
        boxSize={40}
        className={cn(styles.inputIcon, {
          [styles.inputIconFocused]: isFocused,
        })} />

      <input
        type="text"
        onChange={this._change}
        onFocus={this._focus}
        onBlur={this._blur}
        onKeyUp={this._keyup}
        placeholder="Search or paste an url"
        value={value}
        className={styles.inputControl} />

      <span className={cn(styles.inputBar, {
        [styles.inputBarFocused]: isFocused,
      })}></span>

    </div>;
  }

  _change = (event) => {
    const value = event.target.value;
    const source = getChannelUrlSource(value);

    if (source) {
      this.props.onAdd(source, value);
    } else {
      this.props.onSearch(value);
    }

    this.setState({value, source});
  }

  _keyup = (event) => {
    if (event.keyCode === 13) {
      this.props.onSubmit();
    }
  }

  _focus = () => {
    this.setState({isFocused: true});
  }

  _blur = () => {
    this.setState({isFocused: false});
  }
}
