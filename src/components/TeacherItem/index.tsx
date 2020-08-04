import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
  return (
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
  );
}

export default TeacherItem;
