import React, { Component } from 'react';

import './style.scss';

class MatrixFooter extends Component {
  state = {
    editable: this.props.editable
  };

  componentDidUpdate(prevProps) {
    if (this.props.editable !== prevProps.editable) {
      this.setState({ editable: this.props.editable });
    }
  }

  render() {
    const { editable } = this.state;
    const { toggleEditable } = this.props;

    return (
      <div className="footer">
        {editable ? (
          <div className="footer-editable">
            <button className="button-default" onClick={toggleEditable}>
              Cancel
            </button>
            <button className="button-primary">Save</button>
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
