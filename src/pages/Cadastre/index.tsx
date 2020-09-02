import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import Proffy from '../../components/Proffy';
import InputLabel from '../../components/InputLabel';
import InputPasword from '../../components/InputPassword';

import backPurpleIcon from '../../assets/images/icons/back-purple.svg'

import './styles.css';

function Cadastre() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [buttonSubmitDisabled, setButtonSubmitDisabled] = useState(true);
  const regexValidateEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  useEffect(() => {
    const hasFirstName= firstName.trim();
    const hasLastName = lastName.trim();
    const hasValidEmail = regexValidateEmail.test(email);
    const hasPassword = password.trim();
    const hasConfirmPassword = confirmPassword.trim();

    if (hasFirstName && hasLastName && hasValidEmail && hasPassword && hasConfirmPassword) {
      setButtonSubmitDisabled(false);
    }

    else {
      setButtonSubmitDisabled(true);
    }
    
    // eslint-disable-next-line
  }, [firstName, lastName, email, password]);

  function handleCreateUser(e: FormEvent) {
    e.preventDefault();

    const hasPassword = password.trim();
    const hasConfirmPassword = confirmPassword.trim();

    if (hasPassword && hasConfirmPassword && hasPassword !== hasConfirmPassword) {
      return;
    }
  }

  return (
    <div className="cadastre-container">
      <header className="proffy-block-right">
        <Proffy />
      </header>
      <main className="cadastre-content">
        <div>
          <div className="header">
            <Link to="/">
              <img src={backPurpleIcon} alt="Voltar"/>
            </Link>
          </div>
          <div className="body">
            <div className="form-container">
              <h1>Cadastro</h1>
              <p>Preencha todos os dados abaixo para começar</p>
              <form onChange={handleCreateUser}>
                <InputLabel
                  name="first-name"
                  type="text"
                  label="Nome"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <InputLabel
                  name="last-name"
                  type="text"
                  label="Sobrenome"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
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
                <InputPasword
                  name="confirm-password"
                  label="Confirme sua senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />

                <button className="button-submit" type="submit"
                  disabled={buttonSubmitDisabled}>
                  Concluir cadastro
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Cadastre;