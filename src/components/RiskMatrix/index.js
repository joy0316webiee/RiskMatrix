import React, { Component } from 'react';
import MatrixTopbar from './MatrixTopbar';
import MatrixFooter from './MatrixFooter';
import MatrixConsequenceRow from './MatrixConsequenceRow';
import MatrixLikelihoodColumn from './MatrixLikelihoodColumn';
import MatrixRoundButton from './MatrixRoundButton';

import './style.scss';

const matrixConfig = {
  minNumber: 3,
  maxNumber: 8,
  defaultColors: [
    { limit: 6, color: '#97ffb2' },
    { limit: 11, color: '#c2dbff' },
    { limit: 21, color: '#ffcb9e' },
    { limit: 21, color: '#ffcb9e' },
    { limit: 28, color: '#fbff7b' },
    { limit: 36, color: '#9ed8ff' },
    { limit: 43, color: '#b366be' },
    { limit: 49, color: '#ffabb9' },
    { limit: 58, color: '#ffc063' },
    { limit: 64, color: '#ff3131' }
  ]
};

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
      title: 'Almost Certain'
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
  editable: false,
  ratedCells: [],
  undecidedCell: {
    rating: 0,
    color: '#cfcfcf'
  }
};

class RiskMatrix extends Component {
  state = { ...initialState };

  render() {
    const {
      consequences,
      liklihoods,
      editable,
      ratedCells,
      undecidedCell
    } = this.state;

    return (
      <div className="matrix-container">
        <div className="topbar-wrapper">
          <MatrixTopbar editable={editable} undecided={undecidedCell} />
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
                  <div className="consequences-details__row">
                    <MatrixConsequenceRow consequence={item} key={i} />
                  </div>
                ))}
            </div>
            <div className="consequences-add">
              <MatrixConsequenceRow newRow />
            </div>
          </div>
          <div className="likelihoods">
            {liklihoods &&
              liklihoods.map((item, i) => (
                <div className="likelihoods-column" key={i}>
                  <div className="likelihoods-column__content">
                    <MatrixLikelihoodColumn liklihood={item} />
                  </div>
                  <div className="likelihoods-column__delete">
                    {editable && <MatrixRoundButton type="delete" />}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="footer-wrapper">
          <MatrixFooter />
        </div>
      </div>
    );
  }
}

export default RiskMatrix;
