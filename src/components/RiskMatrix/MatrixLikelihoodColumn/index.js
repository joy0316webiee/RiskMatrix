import React, { Component } from 'react';

import MatrixEditableText from '../MatrixEditableText';
import MatrixRoundButton from '../MatrixRoundButton';
import MatrixCell from '../MatrixCell';

import constants from '../Constants';

import './style.scss';

class MatrixLikelihoodColumn extends Component {
  state = {
    likelihood: null,
    cellItems: [],
    colNumber: 0,
    colWidth: 0,
    currentWidth: 0,
    currentHeight: 0,
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
    } else if (this.props !== prevProps) {
      this.setState({ ...this.props }, () => {
        this.initCellItems(this.state);
      });
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
      cells.push(temp);
    }

    this.setState({ cellItems: cells });
  };

  handleDeleteSelf = () => {
    this.props.onDelete(this.state.colNumber);
  };

  render() {
    // prettier-ignore
    const { likelihood, cellItems, currentWidth, editable, colWidth } = this.state;
    const { minLength } = constants;
    const editorWidth = colWidth + 5;

    const displayHeader = ({ title, description }) => (
      <div className="likelihood-header">
        <div className="likelihood-header__description">
          <MatrixEditableText
            text={description}
            textStyle={'grey-sm'}
            maxLength={15}
            alignCenter
            editorWidth={editorWidth}
            editable={editable}
          />
        </div>
        <div className="likelihood-header__title">
          <MatrixEditableText
            text={title}
            textStyle={'black-md'}
            maxLength={15}
            alignCenter
            editorWidth={editorWidth}
            editable={editable}
          />
        </div>
      </div>
    );

    return (
      <div className="likelihood" ref={this.wrapperRef}>
        {likelihood && displayHeader(likelihood)}
        <div className="likelihood-cells">
          {cellItems &&
            cellItems.map((item, i) => (
              <MatrixCell rating={item} key={i} editable={editable} />
            ))}
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
