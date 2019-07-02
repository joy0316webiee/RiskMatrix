import React from 'react';
import classNames from 'classnames';

import './style.scss';

const MatrixRoundButton = ({ type, size, action }) => {
  const btnClass = classNames('round-button', type, size);

  return (
    <button onClick={action && action()} className={btnClass}>
      {type === 'add' ? '+' : '-'}
    </button>
  );
};

export default MatrixRoundButton;
