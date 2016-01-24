import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {nodeOffset, throttle} from '../../utils/common';

export default class LazyList extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    itemHeight: PropTypes.number.isRequired,
    renderItem: PropTypes.func.isRequired,
    container: PropTypes.object, // only 'window' for now
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

  componentWillMount() {
    const {updateDelay} = this.props;
    this._throttledUpdateState = updateDelay > 0
      ? throttle(::this._updateState, this.props.updateDelay)
      : ::this._updateState;
  }

  componentDidMount() {
    this.setState(this._computeState());
    this.props.container.addEventListener('scroll', this._throttledUpdateState);
    this.props.container.addEventListener('resize', this._throttledUpdateState);
  }

  componentWillUnmount() {
    this.props.container.removeEventListener('scroll', this._throttledUpdateState);
    this.props.container.removeEventListener('resize', this._throttledUpdateState);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this._computeState(nextProps));
  }

  render() {
    const {items, renderItem} = this.props;
    const {firstIndex, lastIndex} = this.state;
    const styles = this.getStyles();

    return <ul style={styles.container}>
      {items.slice(firstIndex, lastIndex).map(renderItem)}
    </ul>;
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

  _updateState() {
    this.setState(this._computeState());
  }

  getStyles() {
    return {

      container: {
        listStyleType: 'none',
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
        paddingTop: this.state.bufferStart,
        height: this.state.height,
        ...this.props.style,
      },

    };
  }
}

function getNodeHeight(node) {
  return typeof(node.innerHeight) !== 'undefined'
    ? node.innerHeight
    : node.clientHeight;
}

function getScrollTop(container) {
  return container.scrollY;
}
