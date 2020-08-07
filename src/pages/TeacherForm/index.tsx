import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import api from '../../services/api';

import './styles.css';

function TeacherForm() {
  const history = useHistory();

  const initialStateScheduleItems = [
    { week_day: '', from: '', to: '' }
  ];

  const [scheduleItems, setScheduleItems] = useState([...initialStateScheduleItems]);

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [biography, setBiography] = useState('');

  const [subject, setSubjet] = useState('');
  const [cost, setCost] = useState('');

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      ...initialStateScheduleItems
    ]);
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      const isSamePosition = index === position;

      if (isSamePosition) {
        return { ...scheduleItem, [field]: value };
      }

      else {
        return scheduleItem;
      }
    });

    setScheduleItems(updatedScheduleItems);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    const data = {
      name,
      avatar,
      whatsapp,
      biography,
      subject,
      cost: Number(cost),
      schedules: scheduleItems
    }
    
    api.post('/classes', data)
      .then(() => {
        alert('Cadastro realizado com sucesso');
        history.push('/');
      })
      .catch(() => {
        alert('Erro no cadastro');
      });
  }

  return (
    <div id="page-teacher-form" className="content">
      <PageHeader 
        title="Que incrível que você quer dar aulas." 
        description="O primeiro passo é preencher esse formulário de inscrição."  
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input 
              name="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              label="Nome completo"
              type="name"
            />
            <Input 
              name="avatar" 
              value={avatar} 
              onChange={(e) => setAvatar(e.target.value)} 
              label="Avatar" 
              type="url" 
            />
            <Input 
              name="whatsapp" 
              value={whatsapp} 
              onChange={(e) => setWhatsapp(e.target.value)} 
              label="WhatsApp" 
            />
            <Textarea 
              name="biography" 
              value={biography} 
              onChange={(e) => setBiography(e.target.value)} 
              label="Biografia"
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <Select 
              name="subject"
              value={subject}
              onChange={(e) => setSubjet(e.target.value)}
              label="Matéria"
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
            <Input 
              name="cost"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              label="Custo da sua hora por aula"
              type="text"
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={index} className="schedule-item">
                  <Select 
                    name="week_day"
                    value={scheduleItem.week_day}
                    onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                    label="Dia da semana"
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
                    name="from"
                    value={scheduleItem.from}
                    onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                    label="Das"
                    type="time" 
                  />

                  <Input
                    name="to"
                    value={scheduleItem.to}
                    onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                    label="Até" 
                    type="time" 
                  />
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante"/>
              Importante! <br />
              Prencha todos os dados
            </p>
            <button type="submit">
              Salvar cadastro
            </button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
