import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';
import api from '../../services/api';

export interface Teacher {
  id: number,
  avatar: string,
  biography: string,
  cost: number,
  name: string,
  subject: string,
  whatsapp: string
}

interface TeacherItemProps {
  teacher: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  function createNewConnection() {
    const data = { id_user: teacher.id };
    api.post('/connections', data);
  }
  return (
    <article className="teacher-item">
      <header>
        <img 
          src={teacher.avatar}
          alt={teacher.name}
        />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>
        {teacher.biography}
      </p>

      <footer>
        <p>
          Preço/Hora
          <strong>R${teacher.cost}</strong>
        </p>
        <a 
          onClick={createNewConnection}
          type="button" href={`https://wa.me/${teacher.whatsapp}`} 
          target="__blank"
        >
          <img src={whatsappIcon} alt="WhatsApp"/>
          Entrar em contato
        </a>
      </footer>
    </article>
  );
}

export default TeacherItem;
