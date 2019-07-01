import React, { Component } from 'react';
import MatrixEditableText from '../MatrixEditableText';

import './style.scss';

class MatrixCell extends Component {
  state = { rating: 0, row: 0, col: 0, color: '' };

  componentDidMount() {
    this.setState({ ...this.props });
  }

  render() {
    const { rating, row, col, color } = this.state;

    return (
      <div className="cell" style={{ backgroundColor: color }}>
        <MatrixEditableText text={rating} />
      </div>
    );
  }
}

export default MatrixCell;
