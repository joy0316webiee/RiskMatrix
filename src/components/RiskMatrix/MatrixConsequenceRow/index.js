import React, { Component, Fragment } from 'react';

import MatrixEditableText from '../MatrixEditableText';
import MatrixRoundButton from '../MatrixRoundButton';

import constants from '../Constants';

import './style.scss';

class MatrixConsequenceRow extends Component {
  state = {
    consequence: null,
    rowNumber: 0,
    currentHeight: 0,
    editable: false
  };

  componentDidMount() {
    this.setState({ ...this.props });
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({ ...this.props });
    }
  }

  handleDeleteSelf = () => {
    this.props.onDelete(this.state.rowNumber);
  };

  render() {
    // prettier-ignore
    const { consequence, currentHeight, editable } = this.state;
    const { minLength } = constants;

    const displayDetails = ({ safety, environment }) => (
      <Fragment>
        <div className="consequence-safety">
          <MatrixEditableText
            text={safety.title}
            textStyle={'grey-md'}
            maxLength={30}
            editable={editable}
          />
          <MatrixEditableText
            text={safety.description}
            textStyle={'grey-sm word-break'}
            maxLength={100}
            editable={editable}
          />
        </div>
        <div className="consequence-environment">
          <MatrixEditableText
            text={environment}
            textStyle={'black-md'}
            maxLength={18}
            editable={editable}
          />
        </div>
      </Fragment>
    );

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
        {consequence && displayDetails(consequence)}
      </div>
    );
  }
}

export default MatrixConsequenceRow;
