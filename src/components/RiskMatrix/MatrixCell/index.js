import React, { Component } from 'react';
import isEqual from 'react-fast-compare';
import classNames from 'classnames';

import MatrixEditableText from '../MatrixEditableText';

import './style.scss';

class MatrixCell extends Component {
  state = {
    rating: 0,
    color: '#fff',
    rowNumber: 0,
    colNumber: 0,
    maxRating: 0,
    currentCell: null,
    editable: false,
    editType: 'text',
    error: false
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

  handleSelect = () => {
    const { rowNumber, colNumber } = this.state;
    this.props.onSelectCell({ rowNumber, colNumber });
  };

  handleUpdateRating = (name, rating) => {
    const { maxRating, rowNumber } = this.state;
    if (!isNaN(rating) && rating <= maxRating)
      this.setState({ error: false }, () => {
        this.props.onUpdate && this.props.onUpdate(rowNumber, rating);
      });
    else
      this.setState({ error: true }, () => {
        this.props.onUpdate && this.props.onUpdate(rowNumber, rating);
      });
  };

  render() {
    // prettier-ignore
    const { rating, color, editable, editType, currentCell, rowNumber, colNumber, error} = this.state;
    const cellClass = classNames(
      'cell',
      { 'text-edit': editable && editType === 'text' },
      { 'color-edit': editable && editType === 'color' },
      { selected: isEqual(currentCell, { rowNumber, colNumber }) },
      { undefined: rating === 0 },
      { error: error }
    );

    return (
      <div
        className={cellClass}
        style={{ backgroundColor: color }}
        onClick={this.handleSelect}
      >
        <MatrixEditableText
          text={rating}
          textStyle={'grey-primary-md'}
          name={'rating'}
          maxLength={2}
          alignCenter
          editorWidth={20}
          editable={editable && editType === 'text'}
          onUpdate={this.handleUpdateRating}
        />
      </div>
    );
  }
}

export default MatrixCell;
