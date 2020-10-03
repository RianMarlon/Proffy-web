import React, { useState, FormEvent, useEffect, ChangeEvent } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import api from '../../services/api';
import useForm from '../../hooks/useForm';

import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import Success from '../../components/Success';
import Navbar from '../../components/Navbar';

import warningIcon from '../../assets/images/icons/warning.svg';
import cameraIcon from '../../assets/images/icons/camera-icon.svg';

import './styles.css';

function Profile() {

  const initialFields = {
    whatsapp: '',
    biography: '',
    cost: ''
  }

  const [
    form, errors,
    updateField, validateFields,
    hasOneFieldEmpty, updateForm
  ] = useForm(initialFields);

  const initialStateScheduleItems = [
    { week_day: '', from: '', to: '' }
  ];

  const [me, setMe] = useState({
    avatar: '',
    first_name: '',
    last_name: '',
    email: '',
    whatsapp: '',
    biography: '',
    subject: '',
    cost: '',
    schedules: [],
  });

  const [fileAvatar, setFileAvatar] = useState<any>();
  const [srcAvatar, setSrcAvatar] = useState('');

  const [scheduleItems, setScheduleItems] = useState([...initialStateScheduleItems]);

  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    api.get('/me')
      .then(response => {
        const { user } = response.data;

        if (user.isTeacher) {
          const cost = parseFloat(user.cost.toString());
          updateForm({
            whatsapp: user.whatsapp,
            biography: user.biography,
            cost: cost.toLocaleString('pt-BR', { minimumFractionDigits: 2 }),
          });

          setScheduleItems([...user.schedules]);
        }
        
        setMe({ ...user });
      });

    // eslint-disable-next-line
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

  function fileSelectedHandler(event: ChangeEvent<HTMLInputElement>) {
    const maxSize = 3 * 1024 * 1024;
    const files = event.target.files;

    if (files && files[0]) {
      if (files[0].size > maxSize) {
        const messageError = 'Imagem não pode ter mais de 3MB!'
        toast.error(messageError, {
          autoClose: 5000
        });

        return;
      }
      const url = URL.createObjectURL(files[0]);
      setFileAvatar(files[0]);
      setSrcAvatar(url);
    }
  }
  
  function handleSubmitProfile(e: FormEvent) {
    e.preventDefault();

    const fd = new FormData();
    
    if (fileAvatar) {
      fd.append('avatar', fileAvatar, fileAvatar.name);
      
      api.put('/me', fd, {
          onUploadProgress: (progressEvent) => {
            console.log('Progress event: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%');
          }
        })  
        .then(() => {
          const messageError = 'Imagem alterada com sucesso!';
          toast.success(messageError, {
            autoClose: 5000
          });
        })
        .catch(({ response }) => {
          const messageError = response.data.error;
          toast.error(messageError, {
            autoClose: 5000
          });
        });
    }

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
    
    api.put('/me', data)
      .then(() => {
        setIsSuccess(true);
      })
      .catch(({ response }) => {
        const messageError = response.data.error;
        toast.error(messageError, {
          autoClose: 5000
        });
      });
  }

  return (
    <>
      {
        !isSuccess ? (
          <div id="my-profile-form" className="content">
            <ToastContainer />
            <header className="page-header">
              <Navbar 
                namePage="Meu perfil"
              />
              <div className="header-content">
                <div className="avatar">
                  <img
                    src={srcAvatar || me.avatar}
                    alt="Avatar"
                  />
                  <button type="button">
                    <label htmlFor="avatar">
                      <img 
                        src={cameraIcon}
                        defaultValue={form.avatar}
                        onChange={updateField}
                        alt="Alterar avatar" 
                      />
                      <input 
                        id="avatar"
                        name="avatar"
                        type="file"
                        accept="image/png, image/jpeg, image/pjpeg" 
                        onChange={fileSelectedHandler}
                      />
                    </label>
                  </button>
                </div>
                <div className="teacher-info">
                  <p className="name">{`${me.first_name} ${me.last_name}`}</p>
                  <p className="class">{me.subject}</p>
                </div>
              </div>
            </header>

            <main>
              <form onSubmit={handleSubmitProfile}>
                <fieldset>
                  <legend>Seus dados</legend>
                  <div className="name-block">
                    <Input
                      name="firstName"
                      type="text"
                      label="Nome"
                      value={me.first_name}
                      disabled={true}
                    />
                    <Input
                      name="lastName"
                      type="text"
                      label="Sobrenome"
                      value={me.last_name}
                      disabled={true}
                    />
                  </div>
                  <div className="email-whatsapp-block">
                    <Input
                      name="email"
                      type="email"
                      label="E-mail"
                      value={me.email}
                      disabled={true}
                    />
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
                    maxLength={500}
                    required={true}
                  />
                </fieldset>

                <fieldset>
                  <legend>Sobre a aula</legend>
                  <div className="about-class">
                    <Select 
                      name="subject"
                      value={me.subject}
                      label="Matéria"
                      labelError="Matéria não informada"
                      error={errors.subject}
                      options={[
                        { value: me.subject, label: me.subject},
                      ]}
                      sort
                      disabled={true}
                    />
                    <Input 
                      name="cost"
                      type="text"
                      pattern="^[\d,.]+$"
                      textLeftInput="R$"
                      label="Custo da sua hora por aula"
                      labelError="Preço não informado"
                      error={errors.cost}
                      value={form.cost || ''}
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

                  {scheduleItems.length > 0 && scheduleItems.map((scheduleItem, index) => {
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
        ) : (
          <Success 
            title="Dados alterados!"
            description="Tudo certo, seus dados foram alterados 
            e agora você pode vê-los!"
            textButton="Voltar para a home"
            routeButton="/"
          />
        )
      }
    </>
  );
}

export default Profile;
