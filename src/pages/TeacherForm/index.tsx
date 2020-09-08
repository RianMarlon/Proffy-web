import React, { useState, FormEvent } from 'react';

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

  const initialFields = {
    avatar: '',
    whatsapp: '',
    biography: '',
    subject: '',
    cost: ''
  }

  const [ form, errors,
    updateField, validateFields,
    hasOneError
  ] = useForm(initialFields);

  const initialStateScheduleItems = [
    { week_day: '', from: '', to: '' }
  ];

  const [scheduleItems, setScheduleItems] = useState([...initialStateScheduleItems]);

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
  
  function handleSubmitTeacherForm(e: FormEvent) {
    e.preventDefault();

    validateFields();
        
    if (hasOneError()) {
      return;
    }

    const data = {
      avatar: form.avatar,
      whatsapp: form.whatsapp,
      biography: form.biography,
      subject: form.subject,
      cost: Number(form.cost),
      schedules: scheduleItems
    }
    
    api.post('/classes', data)
      .then(() => {
        alert('Cadastro realizado com sucesso');
      })
      .catch(() => {
        alert('Erro no cadastro');
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
            <Input 
              name="avatar" 
              type="url" 
              label="Avatar(URL)"
              labelError="URL do avatar não informado"
              error={errors.avatar}
              value={form.avatar}
              onChange={updateField}
              required={true}
            />
            <Input 
              name="whatsapp" 
              type="text"
              label="Whatsapp"
              labelError="Número do Whatsapp não informado"
              error={errors.whatsapp}
              value={form.whatsapp}
              onChange={updateField}
              required={true}
            />
            <Textarea 
              name="biography"
              label="Biografia"
              labelError="Biografia não informada"
              error={errors.biography}
              value={form.biography}
              onChange={updateField}
              required={true}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
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
              label="Custo da sua hora por aula"
              labelError="Preço não informado"
              error={errors.cost}
              value={form.cost}
              onChange={updateField}
              required={true}
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
