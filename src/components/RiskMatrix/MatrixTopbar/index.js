import React, { Component } from 'react';
import classNames from 'classnames';

import MatrixCell from '../MatrixCell';

import './style.scss';
import imgCloseIcon from 'assets/images/ic_close.png';

class MatrixTopbar extends Component {
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
    // prettier-ignore
    const { undecided: { rating, color } } = this.props;

    const topbarClass = classNames('topbar', { editable: editable });

    return (
      <div className={topbarClass}>
        <div className="topbar-title">
          <label>Select any Risk Rating</label>
        </div>
        <div className="topbar-content">
          {editable && <EditPanel />}
          <div className="not-decided">
            <span>Not decided</span>
            <MatrixCell rating={rating} color={color} />
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

const EditPanel = () => <div className="edit-panel" />;

export default MatrixTopbar;