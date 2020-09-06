import React, { TextareaHTMLAttributes } from 'react';

import './styles.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string,
  labelError?: string,
  error?: boolean
}

const Textarea: React.FC<TextareaProps> = ({ label, labelError, error, required, ...rest }) => {
  const classNameLabel = error && required ? 'error' : '';

  return (
    <div className="textarea-block">
      <label className={classNameLabel} 
        htmlFor={rest.name}>
          {error && required ? labelError : label}
      </label>
      <textarea id={rest.name} {...rest} aria-required={required} />
    </div>
  );
}

export default Textarea;