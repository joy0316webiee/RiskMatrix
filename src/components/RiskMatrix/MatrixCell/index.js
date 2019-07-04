import React, { Component } from 'react';
import classNames from 'classnames';

import MatrixEditableText from '../MatrixEditableText';
import constants from '../Constants';

import './style.scss';

class MatrixCell extends Component {
  state = {
    rating: 0,
    editable: false
  };

  componentDidMount() {
    this.setState({
      ...this.props
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({ ...this.props });
    }
  }

  getRatedColor = rating => {
    const index = constants.defaultColors.findIndex(
      item => item.limit > rating
    );
    return constants.defaultColors[index].color;
  };

  render() {
    const { rating, editable } = this.state;
    const cellClass = classNames(
      'cell',
      { editable: editable },
      { undefined: rating === 0 }
    );

    return (
      <div
        className={cellClass}
        style={{ backgroundColor: this.getRatedColor(rating) }}
      >
        <MatrixEditableText
          text={rating}
          textStyle={'grey-primary-md'}
          maxLength={2}
          alignCenter
          editorWidth={20}
          editable={editable}
        />
      </div>
    );
  }
}

export default MatrixCell;
