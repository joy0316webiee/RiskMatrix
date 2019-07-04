import React, { Component } from 'react';

import MatrixEditableText from '../MatrixEditableText';
import MatrixRoundButton from '../MatrixRoundButton';

import Config from '../Constants';

import './style.scss';

class MatrixConsequenceRow extends Component {
  handleDeleteSelf = () => {
    this.props.onDelete(this.props.rowNumber);
  };

  render() {
    // prettier-ignore
    const { editable, consequence: {safety, environment}, currentHeight } = this.props;
    const { minLength } = Config;

    return (
      <div className="consequence">
        {editable && (
          <div className="consequence-delete">
            <MatrixRoundButton
              method={'delete'}
              disabled={currentHeight <= minLength}
              action={this.handleDeleteSelf}
            />
          </div>
        )}
        <div className="consequence-safety">
          <MatrixEditableText text={safety.title} theme={'grey-md'} />
          <MatrixEditableText text={safety.description} theme={'grey-sm'} />
        </div>
        <div className="consequence-environment">
          <MatrixEditableText text={environment} theme={'black-md'} />
        </div>
      </div>
    );
  }
}

export default MatrixConsequenceRow;
