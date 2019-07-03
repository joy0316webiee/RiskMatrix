import React, { Component } from 'react';
import classNames from 'classnames';

import MatrixEditableText from '../MatrixEditableText';

import './style.scss';

const defaultColors = [
  { limit: 1, color: '#cfcfcf' },
  { limit: 7, color: '#97ffb2' },
  { limit: 12, color: '#c2dbff' },
  { limit: 22, color: '#ffcb9e' },
  { limit: 29, color: '#fbff7b' },
  { limit: 37, color: '#9ed8ff' },
  { limit: 44, color: '#b366be' },
  { limit: 50, color: '#ffabb9' },
  { limit: 59, color: '#ffc063' },
  { limit: 65, color: '#ff3131' }
];
class MatrixCell extends Component {
  state = { rating: this.props.rating };

  componentDidUpdate(prevProps) {
    if (this.props.rating !== prevProps.rating) {
      this.setState({ rating: this.props.rating });
    }
  }

  getRatedColor = rating => {
    const index = defaultColors.findIndex(item => item.limit > rating);
    return defaultColors[index].color;
  };

  render() {
    const { rating } = this.state;
    const cellClass = classNames('cell', { undefined: rating === 0 });

    return (
      <div
        className={cellClass}
        style={{ backgroundColor: this.getRatedColor(rating) }}
      >
        <MatrixEditableText text={rating} />
      </div>
    );
  }
}

export default MatrixCell;
