import React, { useState, useEffect, ReactNode } from 'react';

import { InputProps } from '../Input';

import './styles.css';

interface InputLabelProps extends InputProps {
  buttonRight?: ReactNode
}

const InputLabel: React.FC<InputLabelProps> = ({ name, label, type, value, onChange, buttonRight }) => {
  const [classNameInput, setClassNameInput] = useState('');
  const classNameInputBlock = `input-label-block ${buttonRight && 'has-button-right'}`;

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
      <input className={classNameInput} 
        type={type} id={name} value={value} onChange={onChange} />
      <label htmlFor={name}>{label}</label>
      { buttonRight && (
        <div className="button-right">
          {buttonRight}
        </div>
      )}
    </div>
  );
}

export default InputLabel;
