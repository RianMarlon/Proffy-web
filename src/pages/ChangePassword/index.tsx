import React, { useState, useEffect, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import api from '../../services/api';
import useForm from '../../hooks/useForm';

import Proffy from '../../components/Proffy';
import InputPasword from '../../components/InputPassword';
import Success from '../../components/Success';

import './styles.css';

function ChangePassword(props: any) {
  const history = useHistory();

  const initialFields = {
    password: '',
    confirmPassword: ''
  }

  const [
    form, errors,
    updateField, validateFields,
    hasOneFieldEmpty
  ] = useForm(initialFields);
  
  const [token, setToken] = useState('');
  const [labelTextError, setLabelTextError] = useState('Senha não informada');
  const [differentPasswords, setDifferentPasswords] = useState(false);
  const [buttonSubmitDisabled, setButtonSubmitDisabled] = useState(true);

  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    (async () => {
      const query = props.location.search;
      const token = query.split('token=')[1];
      
      const data = {
        token
      }

      const response = await api.post("/validate-token", data);
      const { isTokenValid } = response.data;
      
      if (!isTokenValid) {
        history.push('/forgot-password');
      }

      else {
        setToken(token);
      }
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!hasOneFieldEmpty()) {
      setButtonSubmitDisabled(false);
    }

    else {
      setButtonSubmitDisabled(true);
    }

    // eslint-disable-next-line
  }, [form]);

  useEffect(() => {
    setDifferentPasswords(false);
    
    // eslint-disable-next-line
  }, [form.confirmPassword])

  function handleSubmitForgotPassword(e: FormEvent) {
    e.preventDefault();

    validateFields();

    if (form.password !== form.confirmPassword) {
      setDifferentPasswords(true);
      setLabelTextError('Senhas não conferem');
    }

    if (hasOneFieldEmpty() || differentPasswords) {
      return;
    }

    const data = {
      password: form.password,
      confirm_password: form.confirmPassword,
      token
    }

    api.post('/change-password', data)
      .then(() => {
        setIsSuccess(true);
      })
      .catch(({ response }) => {
        const messageError = response.data.error;
        toast.error(messageError, {
          autoClose: 3000
        });
      });
  }

  return (
    <>
      {
        !isSuccess ? (
          <div className="change-password-container">
            <ToastContainer />
            <header className="proffy-block-right">
              <Proffy />
            </header>
            <main className="change-password-content">
              <div>
                <div className="body">
                  <div className="form-container">
                    <h1>Redefinir senha</h1>
                    <p>Você não se lembra da sua antiga senha? Informe uma nova.</p>
                    <form onSubmit={handleSubmitForgotPassword}>
                      <InputPasword
                        name="password"
                        label="Senha"
                        labelError="Senha não informada"
                        error={errors.password}
                        value={form.password}
                        onChange={updateField}
                        required={true}
                      />
                      <InputPasword
                        name="confirmPassword"
                        label="Confirme sua senha"
                        labelError={labelTextError}
                        error={errors.confirmPassword || differentPasswords}
                        value={form.confirmPassword}
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
            title="Senha alterada com sucesso!"
            description="Boa, agora você pode fazer login com a sua nova senha e aproveitar
            os estudos."
            textButton="Fazer login"
            routeButton="/"
          />
        )
      }
    </>
  );
}

export default ChangePassword;
