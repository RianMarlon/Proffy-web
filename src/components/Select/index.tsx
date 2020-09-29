import React, { SelectHTMLAttributes } from 'react';

import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string,
  label: string,
  labelError?: string,
  error?: boolean,
  options: Array<{
    value: string,
    label: string
  }>,
  sort?: boolean
}

interface OptionItem {
  value: string,
  label: string
}

const Select: React.FC<SelectProps> = ({ 
    name, label, labelError, error, required, sort, options, ...rest 
  }) => {
  const classNameLabel = error && required ? 'error' : '';

  if (sort) {
    const functionComparation = (a: OptionItem, b: OptionItem) => {
      if (a.value > b.value) {
        return 1;
      }
  
      else if (a.value < b.value) {
        return -1;
      }
  
      else {
        return 0;
      }
    }
  
    options.sort(functionComparation);
  }
  
  return (
    <div className="select-block">
      <label htmlFor={name} className={classNameLabel}>
        {error && required ? labelError : label}
      </label>
      <select name={name} value="" {...rest} id={name}>
        <option value="" disabled hidden>Selecione uma opção</option>

        {options.map((option: OptionItem) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Select;
