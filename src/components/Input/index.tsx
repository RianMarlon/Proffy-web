import React, { InputHTMLAttributes } from 'react';

import './styles.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  label: string,
  labelError?: string,
  error?: boolean,
}

const Input: React.FC<InputProps> = ({ label, labelError, error, ...rest }) => {
  const classNameLabel = error && rest.required ? 'error' : '';

  return (
    <div className="input-block">
      <label className={classNameLabel} 
        htmlFor={rest.name}>
          {error && rest.required ? labelError : label}
      </label>
      <input {...rest} />
    </div>
  );
}

export default Input;
