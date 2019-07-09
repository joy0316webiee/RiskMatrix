import React, { Component } from 'react';

import MatrixEditableText from '../MatrixEditableText';
import MatrixRoundButton from '../MatrixRoundButton';
import MatrixCell from '../MatrixCell';

import constants from '../Constants';

import './style.scss';

class MatrixLikelihoodColumn extends Component {
  state = {
    likelihood: null,
    colNumber: 0,
    colWidth: 0,
    currentWidth: 0,
    currentHeight: 0,
    editType: 'text',
    editable: false
  };

  componentDidMount() {
    this.setState({ ...this.props }, () => {
      this.initCellItems(this.state);
    });

    this.wrapperRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (this.props.editable !== prevProps.editable) {
      this.setState({ editable: this.props.editable });
    } else if (
      this.props.currentWidth !== prevProps.currentWidth ||
      this.props.currentHeight !== prevProps.currentHeight
    ) {
      this.setState({ ...this.props }, () => {
        this.initCellItems(this.state);
        console.log('here');
      });
    } else if (this.props !== prevProps) {
      this.setState({ ...this.props });
    } else if (this.wrapperRef.current.clientWidth !== this.state.colWidth) {
      this.setState({
        colWidth: this.wrapperRef.current.clientWidth
      });
    }
  }

  initCellItems = ({ colNumber: j, currentWidth, currentHeight }) => {
    let cells = [];
    for (let i = 0; i < currentHeight; i++) {
      let temp = ((i + j) * (i + j + 1)) / 2 + i + 1;
      // prettier-ignore
      if (i + j >= currentWidth) temp = temp - (i + j - currentWidth) * (i + j - currentWidth + 1) / 2 - (i + j - currentWidth + 1);
      // prettier-ignore
      if (i + j >= currentHeight) temp = temp - ((i + j - currentHeight) * (i + j - currentHeight + 1)) / 2;
      cells.push({ rating: temp, color: this.getRatedColor(temp) });
    }

    const { colNumber, likelihood } = this.state;
    const updatedLikelihood = { ...likelihood, cellItems: cells };
    this.props.onUpdate(colNumber, updatedLikelihood);
  };

  getRatedColor = rating => {
    const index = constants.defaultColors.findIndex(
      item => item.limit > rating
    );
    return constants.defaultColors[index].color;
  };

  handleUpdateHeader = (name, text) => {
    const likelihood = {
      ...this.state.likelihood,
      [name]: text
    };
    const { colNumber } = this.state;
    this.props.onUpdate(colNumber, likelihood);
  };

  handleUpdateCellItem = (rowNumber, rating) => {
    const { colNumber, currentWidth, currentHeight, likelihood } = this.state;
    likelihood.cellItems[rowNumber].rating = rating;
    if (!isNaN(rating) && rating <= currentWidth * currentHeight) {
      likelihood.cellItems[rowNumber].color = this.getRatedColor(rating);
    }
    this.props.onUpdate(colNumber, likelihood);
  };

  handleDeleteColumn = () => {
    this.props.onDelete(this.state.colNumber);
  };

  render() {
    // prettier-ignore
    const { likelihood, currentWidth, currentHeight, currentCell, colNumber, editable, editType, colWidth } = this.state;
    const { minLength } = constants;
    const editorWidth = colWidth + 5;

    const displayHeader = ({ title, description }) => (
      <div className="likelihood-header">
        <div className="likelihood-header__description">
          <MatrixEditableText
            text={description}
            textStyle={'grey-sm'}
            name={'description'}
            maxLength={15}
            alignCenter
            editorWidth={editorWidth}
            editable={editable && editType === 'text'}
            onUpdate={this.handleUpdateHeader}
          />
        </div>
        <div className="likelihood-header__title">
          <MatrixEditableText
            text={title}
            textStyle={'black-md'}
            name={'title'}
            maxLength={15}
            alignCenter
            editorWidth={editorWidth}
            editable={editable && editType === 'text'}
            onUpdate={this.handleUpdateHeader}
          />
        </div>
      </div>
    );

    const displayCells = ({ cellItems }) =>
      cellItems.map((item, i) => (
        <MatrixCell
          key={i}
          rating={item.rating}
          color={item.color}
          rowNumber={i}
          colNumber={colNumber}
          currentCell={currentCell}
          maxRating={currentWidth * currentHeight}
          editable={editable}
          editType={editType}
          onSelectCell={this.props.onSelectCell}
          onUpdate={this.handleUpdateCellItem}
        />
      ));

    return (
      <div className="likelihood" ref={this.wrapperRef}>
        {likelihood && displayHeader(likelihood)}
        <div className="likelihood-cells">
          {likelihood && likelihood.cellItems && displayCells(likelihood)}
        </div>
        {editable && (
          <div className="likelihood-delete">
            <MatrixRoundButton
              method={'delete'}
              disabled={currentWidth <= minLength}
              action={this.handleDeleteColumn}
            />
          </div>
        )}
      </div>
    );
  }
}

export default MatrixLikelihoodColumn;
