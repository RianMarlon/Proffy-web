import React, { useState, useEffect, FormEvent, useContext } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import TeachersContext, { Teacher } from '../../contexts/TeachersContext';

import smileIcon from '../../assets/images/icons/smile.svg';

import './styles.css';

function TeacherList() {
  const { teachers, getTeachers, quantityTeachers } = useContext(TeachersContext);

  const [subject, setSubject] = useState('');
  const [weekDay, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const [page, setPage] = useState(1);
  const perPage = 9;

  useEffect(() => {
    searchTeachers();
  }, []);

  async function searchTeachers() {
    const paramsInitial = {
      subject: subject,
      week_day: weekDay,
      time: time,
      page: page,
      per_page: perPage,
    }

    await getTeachers(paramsInitial);
  }

  function handleSearchTeachers(e: FormEvent) {
    e.preventDefault();
    searchTeachers();
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader 
        namePage="Estudar" 
        title="Estes são os proffys disponíveis"
        headerRight={
          <div className="header-right">
            <img src={smileIcon} alt="" />
            <p>Nós temos {quantityTeachers} {' '}
            {quantityTeachers > 1 ? 'professores' : 'professor'}</p>
          </div>
        }
      >
        <form id="search-teachers" onSubmit={handleSearchTeachers}>
          <Select 
            name="subject" 
            label="Matéria"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            options={[
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Física', label: 'Física' },
              { value: 'Química', label: 'Quimíca' },
              { value: 'Português', label: 'Português' },
              { value: 'Redação', label: 'Redação' },
              { value: 'História', label: 'História' },
              { value: 'Filosofia', label: 'Filosofia' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'Sociologia', label: 'Sociologia' },
              { value: 'Inglês', label: 'Inglês' },
              { value: 'Espanhol', label: 'Espanhol' },
              { value: 'Educação Física', label: 'Educação Física' },
              { value: 'Artes', label: 'Artes' }
            ]}
            sort
          />
          <Select 
            name="week_day" 
            label="Dia da semana"
            value={weekDay}
            onChange={(e) => setWeekDay(e.target.value)}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' }
            ]}
            sort
          />
          <Input 
            name="time"
            label="Hora"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            type="time" 
          />

          <button type="submit">
            Buscar
          </button>
        </form>
      </PageHeader>

      <main>
        { teachers.length > 0 && teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />
        })}
      </main>
    </div>
  );
}

export default TeacherList;
