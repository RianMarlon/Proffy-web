import React from 'react';

import api from '../../services/api';
import { Schedule, Teacher } from '../../contexts/TeachersContext';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

interface TeacherItemProps {
  teacher: Teacher,
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
        {teacher.biography.split('\n').map((elem: string, index: number) => {
          return (
            <React.Fragment key={`${teacher.id}-${index}`}>
              {index > 0 && <br />}
              { elem }
            </React.Fragment>
          );
        })}
      </p>

      <div className="schedules">
        { teacher.schedules.map((schedule: Schedule) => {
          return (
            <div key={schedule.id} className="schedule">
              <div className="day">
                <p className="label">Dia</p>
                <p className="value">{ schedule.week_day }</p>
              </div>
              <div className="time">
                <p className="label">Horário</p>
                <p className="value">{ schedule.from.split(':')[0] }h 
                - { schedule.to.split(':')[0] }h</p>
              </div>
            </div>
          );
        })}
      </div>

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
