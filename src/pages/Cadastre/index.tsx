import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import useForm from '../../hooks/useForm';

import Proffy from '../../components/Proffy';
import InputLabel from '../../components/InputLabel';
import InputPasword from '../../components/InputPassword';

import backPurpleIcon from '../../assets/images/icons/back-purple.svg';

import './styles.css';

function Cadastre() {

  const initialFields = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  }

  const [ form, errors,
    updateField, validateFields,
    hasOneFieldEmpty
  ] = useForm(initialFields);

  const [labelTextError, setLabelTextError] = useState("Senha não informada");
  const [differentPasswords, setDifferentPasswords] = useState(false);
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

  useEffect(() => {
    setDifferentPasswords(false);
  }, [form.confirmPassword])

  function handleSubmitCadastre(e: FormEvent) {
    e.preventDefault();

    validateFields();

    if (form.password !== form.confirmPassword) {
      setDifferentPasswords(true);
      setLabelTextError("Senhas não conferem");
    }

    if (hasOneFieldEmpty() || differentPasswords) {
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
              <form onSubmit={handleSubmitCadastre}>
                <InputLabel
                  name="firstName"
                  type="text"
                  label="Nome"
                  labelError="Nome não informado"
                  error={errors.firstName}
                  value={form.firstName}
                  onChange={updateField}
                  required={true}
                />
                <InputLabel
                  name="lastName"
                  type="text"
                  label="Sobrenome"
                  labelError="Sobrenome não informado"
                  error={errors.lastName}
                  value={form.lastName}
                  onChange={updateField}
                  required={true}
                />
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
