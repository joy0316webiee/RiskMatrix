import React, { Component } from 'react';
import classNames from 'classnames';

import './style.scss';

class MatrixEditableText extends Component {
  state = {
    text: this.props.text,
    editing: false
  };

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
