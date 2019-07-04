import React, { Component } from 'react';

import MatrixEditableText from '../MatrixEditableText';
import MatrixRoundButton from '../MatrixRoundButton';

import './style.scss';

class MatrixConsequenceRow extends Component {
  handleRemoveSelf = () => {
    this.props.onRemove(this.props.rowNumber);
  };

  render() {
    // prettier-ignore
    const { editable, consequence: {safety, environment} } = this.props;

    return (
      <div className="consequence">
        {editable && (
          <div className="consequence-action">
            <MatrixRoundButton type={'delete'} action={this.handleRemoveSelf} />
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
