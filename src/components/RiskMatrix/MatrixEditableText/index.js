import React, { Component } from 'react';

import './style.scss';

class MatrixEditableText extends Component {
  state = { ...this.props };

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({ ...this.props });
    }
  }

  render() {
    const { text, editing, theme } = this.state;

    return (
      <div className="editable-text">
        {editing ? (
          <input className={theme} name="text" value={text} />
        ) : (
          <span className={theme}>{text}</span>
        )}
      </div>
    );
  }
}

export default MatrixEditableText;
