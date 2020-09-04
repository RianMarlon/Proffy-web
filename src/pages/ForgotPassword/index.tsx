import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Proffy from '../../components/Proffy';
import InputLabel from '../../components/InputLabel';

import backPurpleIcon from '../../assets/images/icons/back-purple.svg'

import './styles.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const [buttonSubmitDisabled, setButtonSubmitDisabled] = useState(true);
  const regexValidateEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  useEffect(() => {
    const hasValidEmail = regexValidateEmail.test(email);

    if (hasValidEmail) {
      setButtonSubmitDisabled(false);
    }

    else {
      setButtonSubmitDisabled(true);
    }
    
    // eslint-disable-next-line
  }, [email]);

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
              <form>
                <InputLabel
                  name="email"
                  type="email"
                  label="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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