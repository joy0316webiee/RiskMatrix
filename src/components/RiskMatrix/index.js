import React, { Component } from 'react';
import classNames from 'classnames';

import MatrixTopbar from './MatrixTopbar';
import MatrixFooter from './MatrixFooter';
import MatrixConsequenceRow from './MatrixConsequenceRow';
import MatrixLikelihoodColumn from './MatrixLikelihoodColumn';
import MatrixRoundButton from './MatrixRoundButton';

import './style.scss';

const initialState = {
  liklihoods: [
    {
      title: 'Rare',
      description: ''
    },
    {
      title: 'Unlikely',
      description: 'Annually'
    },
    {
      title: 'Occasionaly',
      description: 'Monthly'
    },
    {
      title: 'Likely',
      description: 'Weekly, less 4/mo.'
    },
    {
      title: 'Almost Certain',
      description: ''
    }
  ],
  consequences: [
    {
      safety: {
        title: 'Minor',
        description: 'A minor injury'
      },
      environment: 'Inconsequential'
    },
    {
      safety: {
        title: 'Medical',
        description: 'An injury requiring medical attention'
      },
      environment: 'Negligible'
    },
    {
      safety: {
        title: 'Loss Time Injury',
        description:
          'As a result of the injury a person is likely to be absent for more than a full shift of day.'
      },
      environment: 'Marginal'
    },
    {
      safety: {
        title: 'PTD',
        description: 'An injury resulting in a permanent or total disability'
      },
      environment: 'Critical'
    },
    {
      safety: {
        title: 'Fatality',
        description: 'Hazard where a peson can die'
      },
      environment: 'Catastrophe'
    }
  ],
  addedConsequences: [],
  addedLiklihoods: [],
  editable: false,
  undecidedCell: {
    rating: 0,
    color: '#cfcfcf'
  }
};

class RiskMatrix extends Component {
  state = { ...initialState };

  toggleEditable = () =>
    this.setState(prevState => ({ editable: !prevState.editable }));

  handleCreateConsequence = () => {
    const newConsequence = {
      safety: {
        title: 'New',
        description: ''
      },
      environment: 'New'
    };

    this.setState(prevState => ({
      consequences: prevState.consequences.concat(newConsequence)
    }));
  };

  handleRemoveConsequence = row => {
    this.setState(prevState => ({
      consequences: prevState.consequences.filter(
        (item, index) => index !== row
      )
    }));
  };

  render() {
    const { consequences, liklihoods, editable } = this.state;

    return (
      <div className="matrix-container">
        <div className="topbar-wrapper">
          <MatrixTopbar editable={editable} />
        </div>
        <div className="content-wrapper">
          <div className="consequences">
            <div className="consequences-title">
              <span className="consequences-title__safety">SAFETy</span>
              <span className="consequences-title__environment">
                ENVIronment
              </span>
            </div>
            <div className="consequences-details">
              {consequences &&
                consequences.map((item, i) => (
                  <div className="consequences-details__row" key={i}>
                    <MatrixConsequenceRow
                      editable={editable}
                      consequence={item}
                      onRemove={this.handleRemoveConsequence}
                      row={i}
                    />
                  </div>
                ))}
            </div>
            {editable && (
              <div className="consequences-addnew">
                <MatrixRoundButton
                  type={'add'}
                  action={this.handleCreateConsequence}
                />
              </div>
            )}
          </div>
          <div className={classNames('likelihoods', { editable: editable })}>
            <div className="likelihoods-details">
              {liklihoods &&
                liklihoods.map((item, i) => (
                  <div className="likelihoods-column" key={i}>
                    <div className="likelihoods-column__content">
                      <MatrixLikelihoodColumn
                        editable={editable}
                        likelihood={item}
                        nRows={consequences.length}
                        nCols={liklihoods.length}
                        col={i}
                      />
                    </div>
                    <div className="likelihoods-column__delete">
                      {editable && <MatrixRoundButton type="delete" />}
                    </div>
                  </div>
                ))}
            </div>
            {editable && (
              <div className="likelihoods-addnew">
                <MatrixRoundButton type={'add'} />
              </div>
            )}
          </div>
        </div>
        <div className="footer-wrapper">
          <MatrixFooter
            editable={editable}
            toggleEditable={this.toggleEditable}
          />
        </div>
      </div>
    );
  }
}

export default RiskMatrix;
