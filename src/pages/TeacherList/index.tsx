import React from 'react';

import PageHeader from '../../components/PageHeader';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherList() {
  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers">
          <div className="input-block">
            <label htmlFor="subject">Matéria</label>
            <input type="text" id="subject" />
          </div>

          <div className="input-block">
            <label htmlFor="week-day">Dia da semana</label>
            <input type="text" id="week-day" />
          </div>

          <div className="input-block">
            <label htmlFor="time">Hora</label>
            <input type="text" id="time" />
          </div>
        </form>
      </PageHeader>

      <main>
        <article className="teacher-item">
          <header>
            <img 
              src="https://avatars2.githubusercontent.com/u/47956746?s=460&u=109cb6b8cc13e2b97c080ce08a16d3c5ea6708c5&v=4" 
              alt="Rian Marlon"
            />
            <div>
              <strong>Rian Marlon</strong>
              <span>Física</span>
            </div>
          </header>

          <p>
            Entusiasta das melhores técnicas de Física do mundo.
            <br /><br />
            Apaixonado por fazer cálculos de explodir o cérebro. Físicos do mundo todo o reconhecem como o Isaac Newtow II.
          </p>

          <footer>
            <p>
              Preço/Hora
              <strong>R$250,00</strong>
            </p>
            <button>
              <img src={whatsappIcon} alt="WhatsApp"/>
              Entrar em contato
            </button>
          </footer>
        </article>
      </main>
    </div>
  );
}

export default TeacherList;
