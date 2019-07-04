import React, { Component } from 'react';

import MatrixEditableText from '../MatrixEditableText';
import MatrixCell from '../MatrixCell';

import './style.scss';

class MatrixLikelihoodColumn extends Component {
  state = {
    editable: false,
    likelihood: {},
    colNumber: 0,
    nRows: 0,
    nCols: 0,
    cellItems: []
  };

  componentDidMount() {
    this.setState({ ...this.props }, () => {
      this.initCellItems(this.state);
    });
  }

  componentDidUpdate(prevProps)  {
    if (this.props.editable !== prevProps.editable) {
      this.setState({ editable: this.props.editable });
    } else if (this.props !== prevProps) {
      this.setState({ ...this.props }, () => {
        this.initCellItems(this.state);
      });
    }
  }

  initCellItems = ({ colNumber: j, nRows, nCols }) => {
    let cells = [];
    for (let i = 0; i < nRows; i++) {
      let temp = ((i + j) * (i + j + 1)) / 2 + i + 1;
      // prettier-ignore
      if (i + j >= nCols) temp = temp - (i + j - nCols) * (i + j - nCols + 1) / 2 - (i + j - nCols + 1);
      // prettier-ignore
      if (i + j >= nRows) temp = temp - ((i + j - nRows) * (i + j - nRows + 1)) / 2;
      cells.push(temp);
    }
    this.setState({ cellItems: cells });
  };

  render() {
    // prettier-ignore
    const { likelihood: { description, title }, cellItems } = this.state;

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
      </div>
    );
  }
}

export default MatrixLikelihoodColumn;
