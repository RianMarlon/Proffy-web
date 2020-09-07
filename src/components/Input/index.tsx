import React, { InputHTMLAttributes } from 'react';

import './styles.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  label: string,
  labelError?: string,
  error?: boolean,
}

const Input: React.FC<InputProps> = ({ label, labelError, error, required, ...rest }) => {
  const classNameLabel = error && required ? 'error' : '';

  return (
    <div className="input-block">
      <label className={classNameLabel} 
        htmlFor={rest.name}>
          {error && required ? labelError : label}
      </label>
      <input {...rest} id={rest.name} aria-required={required} />
    </div>
  );
}

export default Input;
