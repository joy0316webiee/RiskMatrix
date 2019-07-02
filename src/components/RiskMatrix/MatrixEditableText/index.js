import React, { Component } from 'react';

import './style.scss';

class MatrixEditableText extends Component {
  state = {
    text: this.props.text,
    editing: false
  };

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({ ...this.props });
    }
  }

  render() {
    const { text, editing } = this.state;
    const { theme } = this.props;

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
