import React, { Component } from 'react';
import classNames from 'classnames';

import MatrixTopbar from './MatrixTopbar';
import MatrixFooter from './MatrixFooter';
import MatrixConsequenceRow from './MatrixConsequenceRow';
import MatrixLikelihoodColumn from './MatrixLikelihoodColumn';
import MatrixRoundButton from './MatrixRoundButton';
import constants from './Constants';

import './style.scss';

const initialState = {
  liklihoods: [
    {
      title: 'Rare',
      description: '',
      cellItems: []
    },
    {
      title: 'Unlikely',
      description: 'Annually',
      cellItems: []
    },
    {
      title: 'Occasionaly',
      description: 'Monthly',
      cellItems: []
    },
    {
      title: 'Likely',
      description: 'Weekly, less 4/mo.',
      cellItems: []
    },
    {
      title: 'Almost Certain',
      description: '',
      cellItems: []
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
  editableLiklihoods: [],
  editableConsequences: [],
  undecidedCell: {
    rating: 0,
    color: '#cfcfcf'
  },
  currentCell: null,
  editType: 'text',
  editable: false
};
class RiskMatrix extends Component {
  state = { ...initialState };

  componentDidMount() {
    this.setState(prevState => ({
      editableLiklihoods: prevState.liklihoods,
      editableConsequences: prevState.consequences
    }));
  }

  toggleEditable = () => {
    this.setState(prevState => ({
      editable: !prevState.editable,
      editableLiklihoods: prevState.liklihoods,
      editableConsequences: prevState.consequences
    }));
  };

  handleCreateConsequence = () => {
    const newConsequence = {
      safety: {
        title: 'New',
        description: 'New description'
      },
      environment: 'New'
    };

    this.setState(prevState => ({
      // prettier-ignore
      editableConsequences: prevState.editableConsequences.concat(newConsequence)
    }));
  };

  handleDeleteConsequence = rowNumber => {
    this.setState(prevState => ({
      editableConsequences: prevState.editableConsequences.filter(
        (item, index) => index !== rowNumber
      )
    }));
  };

  handleCreateLiklihood = () => {
    const newLiklihood = {
      title: 'New',
      description: 'New Description'
    };

    this.setState(prevState => ({
      editableLiklihoods: prevState.editableLiklihoods.concat(newLiklihood)
    }));
  };

  handleDeleteLiklihood = colNumber => {
    this.setState(prevState => ({
      editableLiklihoods: prevState.editableLiklihoods.filter(
        (item, index) => index !== colNumber
      )
    }));
  };

  handleUpdateLiklihood = (colNumber, likelihood) => {
    const { liklihoods } = this.state;
    liklihoods[colNumber] = likelihood;
    this.setState({ liklihoods });
  };

  handleChangeEditType = editType => this.setState({ editType });

  handleChangeColor = color => {
    // prettier-ignore
    const { liklihoods, undecidedCell, currentCell: { rowNumber, colNumber } } = this.state;
    if (colNumber === -1 && rowNumber === -1) {
      undecidedCell.color = color;
      this.setState({ undecidedCell });
    } else {
      liklihoods[colNumber].cellItems[rowNumber].color = color;
      this.setState({ liklihoods });
    }
  };

  handleSelectCell = currentCell => {
    this.setState({ currentCell });
  };

  handleCancel = () => {
    this.setState(
      prevState => ({
        editableLiklihoods: prevState.liklihoods,
        editableConsequences: prevState.consequences
      }),
      () => {
        this.toggleEditable();
      }
    );
  };

  handleSave = () => {
    this.setState(
      prevState => ({
        liklihoods: prevState.editableLiklihoods,
        consequences: prevState.editableConsequences
      }),
      () => {
        this.toggleEditable();
      }
    );
  };

  render() {
    // prettier-ignore
    const { editableConsequences, editableLiklihoods, currentCell, undecidedCell, editable, editType } = this.state;

    const currentWidth = editableLiklihoods.length;
    const currentHeight = editableConsequences.length;

    const { maxLength } = constants;

    return (
      <div className="matrix-container">
        <div className="topbar-wrapper">
          <MatrixTopbar
            editable={editable}
            currentCell={currentCell}
            undecidedCell={undecidedCell}
            onChangeEditType={this.handleChangeEditType}
            onChangeColor={this.handleChangeColor}
            onSelectCell={this.handleSelectCell}
          />
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
              {editableConsequences &&
                editableConsequences.map((item, i) => (
                  <div className="consequences-details__row" key={i}>
                    <MatrixConsequenceRow
                      consequence={item}
                      currentHeight={currentHeight}
                      rowNumber={i}
                      editable={editable}
                      editType={editType}
                      onDelete={this.handleDeleteConsequence}
                    />
                  </div>
                ))}
            </div>
            {editable && (
              <div className="consequences-addnew">
                <MatrixRoundButton
                  method={'create'}
                  disabled={currentHeight >= maxLength}
                  action={this.handleCreateConsequence}
                />
              </div>
            )}
          </div>
          <div className={classNames('likelihoods', { editable: editable })}>
            <div className="likelihoods-details">
              {editableLiklihoods &&
                editableLiklihoods.map((item, i) => (
                  <div className="likelihoods-column" key={i}>
                    <div className="likelihoods-column__content">
                      <MatrixLikelihoodColumn
                        likelihood={item}
                        currentCell={currentCell}
                        currentWidth={currentWidth}
                        currentHeight={currentHeight}
                        colNumber={i}
                        editable={editable}
                        editType={editType}
                        onSelectCell={this.handleSelectCell}
                        onUpdate={this.handleUpdateLiklihood}
                        onDelete={this.handleDeleteLiklihood}
                      />
                    </div>
                  </div>
                ))}
            </div>
            {editable && (
              <div className="likelihoods-addnew">
                <MatrixRoundButton
                  method={'create'}
                  disabled={currentWidth >= maxLength}
                  action={this.handleCreateLiklihood}
                />
              </div>
            )}
          </div>
        </div>
        <div className="footer-wrapper">
          <MatrixFooter
            editable={editable}
            toggleEditable={this.toggleEditable}
            onCancel={this.handleCancel}
            onSave={this.handleSave}
          />
        </div>
      </div>
    );
  }
}

export default RiskMatrix;
