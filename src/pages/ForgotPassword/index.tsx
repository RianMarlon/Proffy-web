import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import useForm from '../../hooks/useForm';
import api from '../../services/api';

import Proffy from '../../components/Proffy';
import InputLabel from '../../components/InputLabel';
import Success from '../../components/Success';

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

  const [isSuccess, setIsSuccess] = useState(false);

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

    const data = {
      email: form.email
    };

    api.post('/forgot-password', data)
      .then(() => {
        setIsSuccess(true);
      })
      .catch(({ response }) => {
        const messageError = response.data.error;
        toast.error(messageError, {
          autoClose: 5000
        });
      });
  }

  return (
    <>
      {
        !isSuccess ? (
          <div className="forgot-password-container">
            <ToastContainer />
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
        ) : (
          <Success 
            title="Redefinição enviada!"
            description="Boa, agora é só checar o e-mail que foi enviado para você
            redefinir sua senha e aproveitar os estudos."
            textButton="Voltar ao login"
            routeButton="/"
          />
        )
      }
    </>
  );
}

export default ForgotPassword;