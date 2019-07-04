import React, { Component } from 'react';

import MatrixEditableText from '../MatrixEditableText';
import MatrixRoundButton from '../MatrixRoundButton';
import MatrixCell from '../MatrixCell';

import Config from '../Constants';

import './style.scss';

class MatrixLikelihoodColumn extends Component {
  state = {
    editable: false,
    likelihood: {},
    cellItems: [],
    colNumber: 0,
    currentWidth: 0,
    currentHeight: 0
  };

  componentDidMount() {
    this.setState({ ...this.props }, () => {
      this.initCellItems(this.state);
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.editable !== prevProps.editable) {
      this.setState({ editable: this.props.editable });
    } else if (this.props !== prevProps) {
      this.setState({ ...this.props }, () => {
        this.initCellItems(this.state);
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
      cells.push(temp);
    }
    this.setState({ cellItems: cells });
  };

  handleDeleteSelf = () => {
    this.props.onDelete(this.state.colNumber);
  };

  render() {
    // prettier-ignore
    const { likelihood: { description, title }, cellItems, currentWidth, editable } = this.state;
    const { minLength } = Config;

    return (
      <div className="likelihood">
        <div className="likelihood-header">
          <div className="likelihood-header__description">
            <MatrixEditableText text={description} theme={'grey-sm'} />
          </div>
          <div className="likelihood-header__title">
            <MatrixEditableText text={title} theme={'black-md'} />
          </div>
        </div>
        <div className="likelihood-cells">
          {cellItems &&
            cellItems.map((item, i) => <MatrixCell rating={item} key={i} />)}
        </div>
        {editable && (
          <div className="likelihood-delete">
            <MatrixRoundButton
              method={'delete'}
              disabled={currentWidth <= minLength}
              action={this.handleDeleteSelf}
            />
          </div>
        )}
      </div>
    );
  }
}

export default MatrixLikelihoodColumn;
