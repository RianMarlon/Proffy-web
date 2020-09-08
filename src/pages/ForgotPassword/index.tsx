import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import useForm from '../../hooks/useForm';

import Proffy from '../../components/Proffy';
import InputLabel from '../../components/InputLabel';

import backPurpleIcon from '../../assets/images/icons/back-purple.svg';

import './styles.css';

function ForgotPassword() {
  const initialFields = {
    email: ''
  }
  
  const [
    form, errors,
    updateField, validateFields,
    hasOneFieldEmpty
  ] = useForm(initialFields);

  const [buttonSubmitDisabled, setButtonSubmitDisabled] = useState(true);
  const regexValidateEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  useEffect(() => {
    const hasValidEmail = regexValidateEmail.test(form.email);

    if (hasValidEmail) {
      setButtonSubmitDisabled(false);
    }

    else {
      setButtonSubmitDisabled(true);
    }
    
    // eslint-disable-next-line
  }, [form]);

  function handleSubmitForgotPassword(e: FormEvent) {
    e.preventDefault();

    validateFields();

    if (hasOneFieldEmpty()) {
      return;
    }
  }

  return (
    <div className="forgot-password-container">
      <header className="proffy-block-right">
        <Proffy />
      </header>
      <main className="forgot-password-content">
        <div>
          <div className="header">
            <Link to="/">
              <img src={backPurpleIcon} alt="Voltar"/>
            </Link>
          </div>
          <div className="body">
            <div className="form-container">
              <h1>Eita, esqueceu sua senha?</h1>
              <p>Não esquenta, vamos dar um jeito.</p>
              <form onSubmit={handleSubmitForgotPassword}>
                <InputLabel
                  name="email"
                  type="email"
                  label="E-mail"
                  labelError="E-mail não informado"
                  error={errors.email}
                  value={form.email}
                  onChange={updateField}
                  required={true}
                />

                <button className="button-submit" type="submit"
                  disabled={buttonSubmitDisabled}>
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ForgotPassword;