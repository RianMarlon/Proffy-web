import React, { useState, FormEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Gravatar from 'react-gravatar';

import api from '../../services/api';
import useForm from '../../hooks/useForm';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';
import rocketIcon from '../../assets/images/icons/rocket.svg';

import './styles.css';

function TeacherForm() {

  const history = useHistory();

  const initialFields = {
    whatsapp: '',
    biography: '',
    subject: '',
    cost: '',
  }

  const [
    form, errors,
    updateField, validateFields,
    hasOneFieldEmpty
  ] = useForm(initialFields);

  const initialStateScheduleItems = [
    { week_day: '', from: '', to: '' }
  ];

  const [me, setMe] = useState({
    first_name: '',
    last_name: '',
    avatar: '',
    email: '',
  });

  const [scheduleItems, setScheduleItems] = useState([...initialStateScheduleItems]);

  useEffect(() => {
    api.get('/me')
      .then(response => {
        const { user } = response.data;
        setMe({ ...user });
      });
  }, []);

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      ...initialStateScheduleItems
    ]);
  }

  function removeScheduleItem(index: number) {
    const hasDifferentIndex = (scheduleItem: any, indexSchedule: number) => indexSchedule !== index; 
    const newScheduleItems = scheduleItems.filter(hasDifferentIndex);

    setScheduleItems([
      ...newScheduleItems
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
  
  function handleSubmitTeacherForm(e: FormEvent) {
    e.preventDefault();

    validateFields();
        
    if (hasOneFieldEmpty()) {
      return;
    }

    const data = {
      whatsapp: form.whatsapp,
      biography: form.biography,
      subject: form.subject,
      cost: form.cost,
      schedules: scheduleItems
    }
    
    api.post('/classes', data)
      .then(() => {
        alert('Aula cadastrada com sucesso!');
        history.push('/home');
      })
      .catch(() => {
        alert('Não foi possível fazer o cadastro!');
      });
  }

  return (
    <div id="page-teacher-form" className="content">
      <PageHeader
        namePage="Dar aulas"
        title="Que incrível que você quer dar aulas" 
        description="O primeiro passo é preencher esse formulário de inscrição"
        headerRight={(
          <div className="header-right">
            <img src={rocketIcon} alt="" />
            <p>Prepare-se! Vai ser o máximo</p>
          </div>
        )}
      />

      <main>
        <form onSubmit={handleSubmitTeacherForm}>
          <fieldset>
            <legend>Seus dados</legend>
            <div className="photo-whatsapp-block">
              <div className="photo">
                {
                  me.avatar ? (
                    <img
                      src={me.avatar}
                      alt="Avatar"
                    />
                  ) : (
                    <Gravatar
                      email={me.email}
                      alt="Avatar"
                    />
                  )
                }
                <p>
                  { me.first_name }
                </p>
              </div>

              <Input 
                name="whatsapp" 
                type="tel"
                placeholder="Ex: 5585992820129"
                pattern="[0-9]+$"
                label="Whatsapp"
                labelError="Whatsapp não informado"
                error={errors.whatsapp}
                value={form.whatsapp}
                onChange={updateField}
                required={true}
              />
            </div>
            <Textarea 
              name="biography"
              label="Biografia"
              note="Máximo de 500 caracteres"
              labelError="Biografia não informada"
              error={errors.biography}
              value={form.biography}
              onChange={updateField}
              required={true}
              maxLength={500}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <div className="about-class">
              <Select 
                name="subject"
                value={form.subject}
                onChange={updateField}
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
                type="text"
                pattern="^[\d,.]+$"
                textLeftInput="R$"
                label="Custo da sua hora por aula"
                labelError="Preço não informado"
                error={errors.cost}
                value={form.cost}
                onChange={updateField}
                required={true}
              />
            </div>
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
                <div key={index} className="schedule-item-container">
                  <div className="schedule-item">
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
                      labelError=""
                      error={false}
                      onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                      label="Das"
                      type="time" 
                    />

                    <Input
                      name="to"
                      value={scheduleItem.to}
                      labelError=""
                      error={false}
                      onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                      label="Até" 
                      type="time" 
                    />
                  </div>
                  { scheduleItems.length > 1 && (
                    <div className="remove-schedule-item">
                      <div className="row">
                        <div></div>
                      </div>
                      <div className="button-remove-block">
                        <button type="button" onClick={() => removeScheduleItem(index)}>
                          Excluir horário
                        </button>
                      </div>
                      <div className="row">
                        <div></div>
                      </div>
                    </div>
                  )}
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
