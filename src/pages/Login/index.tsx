import React, { useState, useEffect, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import useForm from '../../hooks/useForm';
import api from '../../services/api';
import { TOKEN_KEY } from '../../services/auth';

import InputLabel from '../../components/InputLabel';
import InputPasword from '../../components/InputPassword';
import Proffy from '../../components/Proffy';

import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css';

function Login() {

  const history = useHistory();

  const initialFields = {
    email: '',
    password: ''
  }

  const [
    form, errors,
    updateField, validateFields,
    hasOneFieldEmpty
  ] = useForm(initialFields);

  const [rememberMe, setRememberMe] = useState(false);
  const [buttonSubmitDisabled, setButtonSubmitDisabled] = useState(true);
  const regexValidateEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  useEffect(() => {
    const hasValidEmail = regexValidateEmail.test(form.email);

    if (hasValidEmail && !hasOneFieldEmpty()) {
      setButtonSubmitDisabled(false);
    }

    else {
      setButtonSubmitDisabled(true);
    }

    // eslint-disable-next-line
  }, [form]);

  function handleSubmitLogin(e: FormEvent) {
    e.preventDefault();

    validateFields();

    if (hasOneFieldEmpty()) {
      return;
    }

    const data = {
      email: form.email,
      password: form.password
    }

    api.post('/signin', data)
      .then((response) => {
        const { token } = response.data;

        if (rememberMe) {
          localStorage.setItem(TOKEN_KEY, token);
        }

        else {
          sessionStorage.setItem(TOKEN_KEY, token);
        }

        history.push('/home');
      })
      .catch(({ response }) => {
        const messageError = response.data.error;
        toast.error(messageError, {
          autoClose: 5000
        });
      });
  }

  return (
    <div className="login-container">
      <ToastContainer />
      <header className="proffy-block-left">
        <Proffy />
      </header>
      <main className="login-content">
        <div>
          <h1>Fazer Login</h1>
          <form onSubmit={handleSubmitLogin}>
            <InputLabel
              name="email"
              type="email"
              label="E-mail"
              value={form.email}
              onChange={updateField}
              labelError="E-mail não informado"
              error={errors.email}
              required={true}
            />

            <InputPasword
              name="password"
              label="Senha"
              value={form.password}
              onChange={updateField}   
              labelError="Senha não informada"
              error={errors.password}
              required={true}
            />

            <div className="extras-block">
              <label className="checkbox-remember" htmlFor="remember-me">
                <input type="checkbox" name="rememberMe" id="remember-me"
                  defaultChecked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <span className="check-after" />
                <span className="checkbox-label">Lembrar-me</span>
              </label>

              <Link to="/forgot-password">
                Esqueceu sua senha?
              </Link>
            </div>

            <button className="button-submit" type="submit"
              disabled={buttonSubmitDisabled}>
              Entrar
            </button>
          </form>
          <div className="footer">
            <p>
              Não tem conta?
              <Link to="/register">Cadastre-se</Link>
            </p>
            <span>É de graça <img src={purpleHeartIcon} alt="" /></span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
