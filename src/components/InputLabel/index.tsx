import React, { useState, useEffect, ReactNode } from 'react';

import { InputProps } from '../Input';

import './styles.css';

interface InputLabelProps extends InputProps {
  buttonRight?: ReactNode
}

const InputLabel: React.FC<InputLabelProps> = ({ name, label, type, value, onChange, required, buttonRight }) => {
  const [classNameInput, setClassNameInput] = useState('');
  const classNameInputBlock = buttonRight 
    ? 'input-label-block has-button-right' 
    : 'input-label-block'
  ;

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
      <input id={name} className={classNameInput} 
        name={name} type={type} value={value} 
        onChange={onChange} required={required}
        aria-required={required}
      />
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
