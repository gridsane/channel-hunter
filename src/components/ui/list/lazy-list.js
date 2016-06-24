import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {nodeOffset, throttle} from '../../../utils';
import cn from 'classnames';
import styles from './list.scss';

export default class LazyList extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    itemHeight: PropTypes.number.isRequired,
    renderItem: PropTypes.func.isRequired,
    container: PropTypes.object,
    updateDelay: PropTypes.number,
    itemsBuffer: PropTypes.number,
  };

  static defaultProps = {
    container: typeof window !== 'undefined' ? window : undefined,
    updateDelay: 0,
    itemsBuffer: 0,
  };

  state = {
    height: 0,
    bufferStart: 0,
    firstIndex: 0,
    lastIndex: 0,
  };

  render() {
    const {items, renderItem} = this.props;
    const {firstIndex, lastIndex} = this.state;
    const offsetStyles = this._getOffsetStyles();
    const className = cn(styles.list, this.props.className);

    return <ul className={className} style={offsetStyles}>
      {items.slice(firstIndex, lastIndex).map(renderItem)}
    </ul>;
  }

  componentWillMount() {
    const {updateDelay} = this.props;
    this._throttledUpdateState = updateDelay > 0
      ? throttle(this._updateState, this.props.updateDelay)
      : this._updateState;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {firstIndex, lastIndex} = this.state;
    const {items, renderItem} = this.props;

    return nextState.firstIndex !== firstIndex
      || nextState.lastIndex !== lastIndex
      || items !== nextProps.items
      || renderItem !== nextProps.renderItem;
  }

  componentDidMount() {
    this._attachScrollListener(this.props.container);

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this._throttledUpdateState);
    }

    this.setState(this._computeState());
  }

  componentWillUnmount() {
    this._detachScrollListener(this.props.container);
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this._throttledUpdateState);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.container !== nextProps.container) {
      this._detachScrollListener(this.props.container);
      this._attachScrollListener(nextProps.container);
    }

    this.setState(this._computeState(nextProps));
  }

  _attachScrollListener(container) {
    container.addEventListener('scroll', this._throttledUpdateState);
  }

  _detachScrollListener(container) {
    container.removeEventListener('scroll', this._throttledUpdateState);
  }

  _computeState(props = this.props) {
    const {itemHeight, items, itemsBuffer, container} = props;

    const node = ReactDOM.findDOMNode(this);
    const offsetTop = nodeOffset(node).top;
    const scrollTop = getScrollTop(container);

    const listViewTop = Math.max(0, scrollTop - offsetTop);
    const listViewHeight = getNodeHeight(container);

    const firstIndex = Math.max(0,
      Math.floor(listViewTop / itemHeight) - itemsBuffer
    );

    const lastIndex = Math.min(items.length,
      (itemsBuffer * 2) + firstIndex + Math.ceil(listViewHeight / itemHeight)
    );

    return {
      height: itemHeight * items.length,
      bufferStart: itemHeight * firstIndex,
      firstIndex,
      lastIndex,
    };
  }

  _updateState = () => {
    this.setState(this._computeState());
  }

  _getOffsetStyles() {
    return {
      paddingTop: this.state.bufferStart,
      height: this.state.height,
    };
  }
}

function getNodeHeight(node) {
  return typeof(node.innerHeight) !== 'undefined'
    ? node.innerHeight
    : node.clientHeight;
}

function getScrollTop(container) {
  return typeof(container.scrollY) !== 'undefined'
    ? container.scrollY
    : container.scrollTop;
}
