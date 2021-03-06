import React, { useState, useEffect, FormEvent, useContext, useRef } from 'react';
import { ToastContainer } from 'react-toastify';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import api from '../../services/api';
import TeachersContext, { Teacher } from '../../contexts/TeachersContext';

import loadingAnimated from '../../assets/images/loading.svg';
import smileIcon from '../../assets/images/icons/smile.svg';

import './styles.css';

function TeacherList() {
  const {
    teachers, getTeachers,
    quantityTeachers
  } = useContext(TeachersContext);

  const [idSubject, setIdSubject] = useState('');
  const [weekDay, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const [page, setPage] = useState(1);
  const perPage = 5;

  const [subjects, setSubjects] = useState<any>([
    { id: '', subject: '' }
  ]);

  const [showLoading, setShowLoading] = useState(false);
  const [scrollRadio, setScrollRadio] = useState(Number);
  const [isFirstSearch, setIsFirstSearch] = useState(false);

  const scrollObservable = useRef<HTMLDivElement>(null);
  const intersectionObserver = new IntersectionObserver((entries) => {
    const radio = entries[0].intersectionRatio;
    setScrollRadio(radio);
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/subjects');
        const { subjects } = response.data;
        setSubjects([ ...subjects ]);

        await loadTeachers();
      }
      finally {
        setIsFirstSearch(true);
      }
    })();

    if (scrollObservable.current) {
      intersectionObserver.observe(scrollObservable.current);
    }
    
    return () => {
      intersectionObserver.disconnect();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isFirstSearch && scrollRadio > 0) {
      loadTeachers();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollRadio]);

  async function loadTeachers() {
    if (quantityTeachers !== 0 && perPage * page >= quantityTeachers + perPage) {
      return;
    }

    const params = {
      id_subject: idSubject,
      week_day: weekDay,
      time: time,
      page: page,
      per_page: perPage,
    }

    setShowLoading(true);

    await getTeachers(params);
    
    setShowLoading(false);
    setPage(page + 1);
  }

  async function handleSearchTeachers(e: FormEvent) {
    e.preventDefault();
    
    const params = {
      id_subject: idSubject,
      week_day: weekDay,
      time: time,
      page: 1,
      per_page: perPage,
    }

    try {
      await getTeachers(params);
    }
    finally {
      setIsFirstSearch(true);
    }

    setPage(2);
  }

  return (
    <div id="page-teacher-list" className="container">
      <ToastContainer />
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
            value={idSubject}
            onChange={(e) => setIdSubject(e.target.value)}
            options={subjects.map((subject: { id: number, subject: string }) => {
              return { value: `${subject.id}`, label: subject.subject }
            })}
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
          { teachers.length > 0 ? (
              teachers.map((teacher: Teacher) => {
                return <TeacherItem key={teacher.id_class} teacher={teacher} />
              })
            ) : (
              isFirstSearch && (
                <div className="no-results">
                  <p>
                    Nenhum professor encontrado.
                  </p>
                </div>
              )
            )
          }

          <div ref={scrollObservable}></div>

          { teachers.length > 0 && showLoading && (
            <div className="loading">
              <img src={loadingAnimated} alt=""/>
            </div>
          )}
      </main>
    </div>
  );
}

export default TeacherList;
