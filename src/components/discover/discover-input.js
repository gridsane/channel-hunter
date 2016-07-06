import React, {Component, PropTypes} from 'react';
import {Icon, IconButton} from '../ui';
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
    value: '',
    prevValue: '',
    source: null,
  }

  render() {
    const {value, source} = this.state;

    return <div className={styles.input}>
      <div className={styles.inputWrapper}>

        <input
          ref="input"
          type="text"
          onChange={this._change}
          onKeyUp={this._keyup}
          placeholder="Search or paste an url"
          value={value}
          className={styles.inputControl} />

        <Icon
          glyph={source ? 'add' : 'search'}
          size={24}
          boxSize={40}
          className={cn(styles.inputIcon)} />

        <span className={cn(styles.inputBar)}></span>

        {value.trim().length
          ? <IconButton
            glyph="clear"
            onClick={this._clear}
            size={24}
            boxSize={40}
            className={cn(styles.inputClear)} />
          : null}

      </div>
    </div>;
  }

  componentDidMount() {
    this.refs.input.focus();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.prevValue) {
      this.setState({value: nextProps.value, prevValue: nextProps.value});
    }
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

  _clear = () => {
    this.setState({value: '', source: null}, () => this.props.onSearch(''));
  }
}
