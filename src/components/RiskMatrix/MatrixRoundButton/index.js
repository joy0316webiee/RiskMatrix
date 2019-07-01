import React from 'react';
import classNames from 'classnames';

const MatrixRoundButton = ({ type, size, action }) => {
  const btnClass = classNames(type, size);

  return (
    <button onClick={action && action()} className={btnClass}>
      {type === 'add' ? '+' : '-'}
    </button>
  );
};

export default MatrixRoundButton;
