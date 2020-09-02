import React, { useState, useEffect } from 'react';

import Proffy from '../../components/Proffy';
import InputLabel from '../../components/InputLabel';
import InputPasword from '../../components/InputPassword';
import { Link } from 'react-router-dom';

import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remeberMe, setRememberMe] = useState(false);
  const [buttonSubmitDisabled, setButtonSubmitDisabled] = useState(true);
  const regexValidateEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  useEffect(() => {
    if (regexValidateEmail.test(email) && password.trim()) {
      setButtonSubmitDisabled(false);
    }

    else {
      setButtonSubmitDisabled(true);
    }
  
    // eslint-disable-next-line
  }, [email, password])

  return (
    <div className="login-container">
      <header className="proffy-block-left">
        <Proffy />
      </header>
      <main className="login-content">
        <div>
          <h1>Fazer Login</h1>
          <form>
            <InputLabel
              name="email"
              type="email"
              label="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <InputPasword
              name="password"
              label="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="extras-block">
              <label className="checkbox-remember" htmlFor="remember-me">
                <input type="checkbox" name="remember-me" id="remember-me"
                  defaultChecked={remeberMe}
                  onChange={() => setRememberMe(!!remeberMe)} />
                <span className="check-after" />
                <span className="checkbox-label">Lembrar-me</span>
              </label>

              <Link to="#">
                Esqueceu sua senha?
              </Link>
            </div>

            <button className="button-submit"  type="submit"
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