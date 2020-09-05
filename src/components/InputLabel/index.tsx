import React, { useState, useEffect, ReactNode } from 'react';

import { InputProps } from '../Input';

import './styles.css';

interface InputLabelProps extends InputProps {
  buttonRight?: ReactNode
}

const InputLabel: React.FC<InputLabelProps> = ({ name, label, labelError, error, type, value, onChange, required, buttonRight }) => {
  const [classNameInput, setClassNameInput] = useState('');
  const classNameInputBlock = buttonRight 
    ? 'input-label-block has-button-right' 
    : 'input-label-block'
  ;
  const classNameLabel = error ? 'error' : '';

  useEffect(() => {
    if (value && value.toString()) {
      setClassNameInput('focus');
    }

    else {
      setClassNameInput('no-focus');
    }
  }, [value]);

  return (
    <div className={classNameInputBlock}>
      <input className={classNameInput} name={name}
        type={type} id={name} value={value} onChange={onChange}
        aria-required={required}
      />
      <label className={classNameLabel} htmlFor={name}>
        {error ? labelError : label}
      </label>
      { buttonRight && (
        <div className="button-right">
          {buttonRight}
        </div>
      )}
    </div>
  );
}

export default InputLabel;
