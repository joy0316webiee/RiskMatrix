import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import classNames from 'classnames';

import './style.scss';

class MatrixEditableText extends Component {
  state = { ...this.props };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutside);
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({ ...this.props });
    }
  }

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ editing: false });
    }
  };

  handleChangeText = e => this.setState({ text: e.target.value });

  handleChangeEditing = () => {
    if (this.state.editable) {
      this.setState({ editing: true });
    }
  };

  render() {
    // prettier-ignore
    const { text, textStyle, editing, alignCenter, maxLength, editorWidth } = this.state;

    return (
      <div
        className={classNames('editable-text', {
          'align-center': alignCenter
        })}
        onClick={this.handleChangeEditing}
        ref={this.setWrapperRef}
      >
        {editing ? (
          <div className="editable-text__editor" style={{ width: editorWidth }}>
            <TextareaAutosize
              autoFocus
              value={text}
              maxRows={2}
              maxLength={maxLength}
              className={textStyle}
              onChange={this.handleChangeText}
            />
          </div>
        ) : (
          <div className="editable-text__content">
            <span className={textStyle}>{text}</span>
          </div>
        )}
      </div>
    );
  }
}

export default MatrixEditableText;
