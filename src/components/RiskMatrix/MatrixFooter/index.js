import React, { Component } from 'react';

class MatrixFooter extends Component {
  state = {
    editable: false
  };

  render() {
    const { editable } = this.state;

    return (
      <div className="footer">
        {editable ? (
          <div className="footer-editable">
            <button>Cancel</button>
            <button>Save</button>
          </div>
        ) : (
          <div className="footer-normal">
            <button>Edit Rating</button>
          </div>
        )}
      </div>
    );
  }
}

export default MatrixFooter;
