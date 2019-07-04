import React from 'react';
import classNames from 'classnames';

import './style.scss';

const MatrixRoundButton = ({ method, type, disabled, action }) => {
  const btnClass = classNames(
    'round-button',
    { [type]: type },
    { [method]: !disabled },
    { disabled: disabled }
  );

  const handleClick = () => {
    action && action();
  };

  return (
    <button onClick={handleClick} className={btnClass} disabled={disabled}>
      {method === 'create' ? '+' : '-'}
    </button>
  );
};

export default MatrixRoundButton;
