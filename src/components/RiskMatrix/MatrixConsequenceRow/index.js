import React, { Component, Fragment } from 'react';
import MatrixEditableText from '../MatrixEditableText';
import MatrixRoundButton from '../MatrixRoundButton';

import './style.scss';

class MatrixConsequenceRow extends Component {
  render() {
    const { consequence, newRow } = this.props;

    const displayRowInfo = ({ safety, environment }) => (
      <Fragment>
        <div className="consequence-safety">
          <MatrixEditableText text={safety.title} theme={'grey-md'} />

          <MatrixEditableText text={safety.description} theme={'grey-sm'} />
        </div>
        <div className="consequence-environment">
          <MatrixEditableText text={environment} theme={'black-md'} />
        </div>
      </Fragment>
    );

    const displayRowCreate = () => (
      <Fragment>
        <div className="consequence-safety">
          <MatrixEditableText text={'New'} theme={'grey-md'} />
          <MatrixRoundButton type={'add'} size={'small'} />
        </div>
        <div className="consequence-environment">
          <MatrixEditableText text={'New'} theme={'black-md'} />
        </div>
      </Fragment>
    );

    return (
      <div className="consequence">
        {newRow ? displayRowCreate() : displayRowInfo(consequence)}
      </div>
    );
  }
}

export default MatrixConsequenceRow;
