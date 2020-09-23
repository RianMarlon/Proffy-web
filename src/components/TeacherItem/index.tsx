import React from 'react';
import Gravatar from 'react-gravatar';
import { toast } from 'react-toastify';

import api from '../../services/api';
import { Schedule, Teacher } from '../../contexts/TeachersContext';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

interface TeacherItemProps {
  teacher: Teacher,
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  const cost = parseFloat(teacher.cost);

  function createNewConnection() {
    const data = { id_class: teacher.id_class };
    api.post('/connections', data)
      .catch(({ response }) => {
        const messageError = response.data.error;
        toast.error(messageError, {
          autoClose: 3000
        });
      });
  }

  return (
    <article className="teacher-item">
      <header>
        {
          teacher.avatar ? (
            <img
              src={teacher.avatar}
              alt="Avatar"
            />
          ) : (
            <Gravatar
              email={teacher.email}
            />
          )
        }
        <div>
          <strong>{`${teacher.first_name} ${teacher.last_name}`}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>
        {teacher.biography.split('\n').map((elem: string, index: number) => {
          return (
            <React.Fragment key={`${teacher.id_class}-${index}`}>
              {index > 0 && <br />}
              { elem }
            </React.Fragment>
          );
        })}
      </p>

      <div className="schedules">
        { teacher.schedules.map((schedule: Schedule) => {
          return (
            <div key={schedule.id_class_schedule} className="schedule">
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
          <strong>
            {cost.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
          </strong>
        </p>
        <a 
          onClick={createNewConnection}
          type="button" 
          href={`https://wa.me/${teacher.whatsapp}`} 
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
