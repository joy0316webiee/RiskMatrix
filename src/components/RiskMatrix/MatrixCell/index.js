import React, { Component } from 'react';
import classNames from 'classnames';

import MatrixEditableText from '../MatrixEditableText';
import Config from '../Constants';

import './style.scss';

class MatrixCell extends Component {
  state = { rating: this.props.rating };

  componentDidUpdate(prevProps) {
    if (this.props.rating !== prevProps.rating) {
      this.setState({ rating: this.props.rating });
    }
  }

  getRatedColor = rating => {
    const index = Config.defaultColors.findIndex(item => item.limit > rating);
    return Config.defaultColors[index].color;
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
