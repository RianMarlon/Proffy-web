import React, { useState, useEffect, FormEvent } from 'react';

import Proffy from '../../components/Proffy';
import InputLabel from '../../components/InputLabel';
import InputPasword from '../../components/InputPassword';
import { Link } from 'react-router-dom';

import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css';
import useForm from '../../hooks/useForm';

function Login() {

  const initialFields = {
    email: "",
    password: ""
  }

  const [ form, errors,
    updateField, validateFields,
    hasOneFieldEmpty, hasOneError
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

    if (hasOneError()) {
      return;
    }
  }

  return (
    <div className="login-container">
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
              <Link to="/cadastre">Cadastre-se</Link>
            </p>
            <span>É de graça <img src={purpleHeartIcon} alt="" /></span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
