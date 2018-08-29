import { Component } from 'react';
import PropTypes from 'prop-types';

export default class StorageErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  componentDidCatch(err) {
    localStorage.clear();
    throw err;
  }

  render() {
    return this.props.children;
  }
}
