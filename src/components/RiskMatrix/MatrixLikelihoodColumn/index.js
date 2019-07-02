import React, { Component } from 'react';

import MatrixEditableText from '../MatrixEditableText';
import MatrixCell from '../MatrixCell';

import './style.scss';

class MatrixLikelihoodColumn extends Component {
  state = {
    editable: false,
    likelihood: {},
    col: 0,
    nRows: 0,
    nCols: 0,
    cells: []
  };

  componentDidMount() {
    this.setState({ ...this.props }, () => {
      this.initCells(this.state);
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({ ...this.props });
    }
  }

  initCells = ({ col, nRows, nCols }) => {
    let cells = [];

    for (let row = 0; row < nRows; row++) {
      let temp = ((row + col) * (row + col + 1)) / 2 + row + 1;

      if (row + col >= nCols) {
        // prettier-ignore
        temp = temp - (row + col - nCols) * (row + col - nCols + 1) / 2 - (row + col - nCols + 1);
      }
      if (row + col >= nRows) {
        temp = temp - ((row + col - nRows) * (row + col - nRows + 1)) / 2;
      }

      cells.push(temp);
    }
    this.setState({ cells });
  };

  render() {
    const {
      likelihood: { description, title },
      cells
    } = this.state;

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
          {cells &&
            cells.map((cell, i) => <MatrixCell rating={cell} key={i} />)}
        </div>
      </div>
    );
  }
}

export default MatrixLikelihoodColumn;
