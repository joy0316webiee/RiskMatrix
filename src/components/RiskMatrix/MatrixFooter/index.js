import React, { Component } from 'react';

import './style.scss';

class MatrixFooter extends Component {
  state = { editable: this.props.editable };

  componentDidUpdate(prevProps) {
    if (this.props.editable !== prevProps.editable) {
      this.setState({ editable: this.props.editable });
    }
  }

  render() {
    const { editable } = this.state;
    const { onSave, onCancel, toggleEditable } = this.props;

    return (
      <div className="footer">
        {editable ? (
          <div className="footer-editable">
            <button className="button-default" onClick={onCancel}>
              Cancel
            </button>
            <button className="button-primary" onClick={onSave}>
              Save
            </button>
          </div>
        ) : (
          <div className="footer-normal">
            <button className="button-default" onClick={toggleEditable}>
              Edit Rating
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default MatrixFooter;
