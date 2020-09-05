import React, { useState, useEffect } from 'react';

import InputLabel from '../InputLabel';
import { InputProps } from '../Input';

import showIcon from '../../assets/images/icons/show.svg';
import doNotShowIcon from '../../assets/images/icons/do-not-show.svg';

import './styles.css';

interface InputPasswordProps extends InputProps {
  name: string,
  label: string,
}

const InputPasword: React.FC<InputPasswordProps> = ({ name, label, labelError, error, value, onChange, required  }) => {
  const [typeInput, setTypeInput] = useState('password');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if(showPassword) {
      setTypeInput('text');
    }

    else {
      setTypeInput('password');
    }
  }, [showPassword]);

  return (
    <div className="input-password-block">
      <InputLabel type={typeInput} name={name} label={label} 
        labelError={labelError} error={error}
        value={value} onChange={onChange} required={required}
        buttonRight={
          <button className="button-show-password" type="button" onClick={() => setShowPassword(!showPassword)}>
            { showPassword 
              ? <img src={doNotShowIcon} alt="Não mostrar senha" />
              : <img src={showIcon} alt="Mostrar senha" />
            }
          </button>
        }/>
    </div>
  );
}

export default InputPasword;
