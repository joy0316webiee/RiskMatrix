import React, { Component } from 'react';

import MatrixEditableText from '../MatrixEditableText';
import MatrixCell from '../MatrixCell';

class MatrixLikelihoodColumn extends Component {
  render() {
    const {
      liklihood: { title, description }
    } = this.props;

    return (
      <div className="likelihood">
        <div className="likelihood-header">
          <MatrixEditableText text={description} theme={'grey-sm'} />
          <MatrixEditableText text={title} theme={'grey-md'} />
        </div>
        <div className="likelihood-cells" />
      </div>
    );
  }
}

export default MatrixLikelihoodColumn;
