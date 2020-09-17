import React, { InputHTMLAttributes } from 'react';

import './styles.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  label: string,
  textLeftInput?: string,
  labelError?: string,
  error?: boolean,
}

const Input: React.FC<InputProps> = ({ label, textLeftInput, labelError, error, required, ...rest }) => {
  const classNameLabel = error && required ? 'error' : '';
  const classNameInput = textLeftInput 
    ? 'input text-left' 
    : 'input'
  ;

  return (
    <div className="input-block">
      <label className={classNameLabel} 
        htmlFor={rest.name}>
          {error && required ? labelError : label}
      </label>
      <div className={classNameInput}>
        <input {...rest} id={rest.name} aria-required={required} />
        {
          textLeftInput && (
            <span>{ textLeftInput }</span>
          )
        }
      </div>
    </div>
  );
}

export default Input;
