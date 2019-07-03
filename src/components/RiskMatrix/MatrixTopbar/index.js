import React, { Component } from 'react';
import { CirclePicker } from 'react-color';
import classNames from 'classnames';

import MatrixCell from '../MatrixCell';

import './style.scss';
import imgCloseIcon from 'assets/images/ic_close.png';
import imgEditIcon from 'assets/images/ic_edit.png';
import imgPaintIcon from 'assets/images/ic_paint.png';

const MENU_EDIT = 0;
const MENU_PAINT = 1;
class MatrixTopbar extends Component {
  state = {
    editable: this.props.editable,
    currentMenu: MENU_EDIT,
    openedSketch: false,
    pickedColor: '#fff'
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutside);
  }

  componentDidUpdate(prevProps) {
    if (this.props.editable !== prevProps.editable) {
      this.setState({ editable: this.props.editable });
    }
  }

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ openedSketch: false });
    }
  };

  handleClickEditText = () => this.setState({ currentMenu: MENU_EDIT });

  handleClickPaintColor = () =>
    this.setState(prevState => ({
      currentMenu: MENU_PAINT,
      openedSketch: !prevState.openedSketch
    }));

  handleChangeColor = color =>
    this.setState({ pickedColor: color.hex, openedSketch: false });

  render() {
    const { editable, currentMenu, openedSketch, pickedColor } = this.state;
    const topbarClass = classNames('topbar', { editable: editable });

    const displayEditPanel = () => (
      <div className="edit-panel">
        <div
          className={classNames('edit-panel__text', {
            active: currentMenu === MENU_EDIT
          })}
          onClick={this.handleClickEditText}
        >
          <img src={imgEditIcon} alt="edit" />
        </div>
        <div className="edit-panel__paint" ref={this.setWrapperRef}>
          <div
            className={classNames('edit-panel__paint-toggle', {
              active: currentMenu === MENU_PAINT
            })}
            onClick={this.handleClickPaintColor}
          >
            <img src={imgPaintIcon} alt="paint" />
          </div>
          {openedSketch && (
            <div className="edit-panel__paint-sketch">
              <CirclePicker
                color={pickedColor}
                onChangeComplete={this.handleChangeColor}
              />
            </div>
          )}
        </div>
      </div>
    );

    return (
      <div className={topbarClass}>
        <div className="topbar-title">
          <label>Select any Risk Rating</label>
        </div>
        <div className="topbar-content">
          {editable && displayEditPanel()}
          <div className="not-decided">
            <span>Not decided</span>
            <MatrixCell rating={0} />
          </div>
        </div>
        <div className="topbar-close">
          <button>
            <img src={imgCloseIcon} alt="close-icon" />
          </button>
        </div>
      </div>
    );
  }
}

export default MatrixTopbar;
