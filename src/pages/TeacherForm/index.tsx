import React from 'react';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';

function TeacherForm() {
  return (
    <div id="page-teacher-form" className="content">
      <PageHeader 
        title="Que incrível que voce quer dar aulas." 
        description="O primeiro passo é preencher esse formulário de inscrição."  
      />

      <main>
        <fieldset>
          <legend>Seus dados</legend>
          <Input name="name" label="Nome completo" type="name" />
          <Input name="avatar" label="Avatar" type="url" />
          <Input name="whatsapp" label="WhatsApp" />
          <Textarea name="biography" label="Biografia" />
        </fieldset>

        <fieldset>
          <legend>Sobre a aula</legend>
          <Select 
            name="subject" 
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
          />
          <Input name="cost" label="Custo da sua hora por aula" type="url" />
        </fieldset>

        <footer>
          <p>
            <img src={warningIcon} alt="Aviso importante"/>
            Importante! <br />
            Prencha todos os dados
          </p>
          <button type="button">
            Salvar cadastro
          </button>
        </footer>
      </main>
    </div>
  );
}

export default TeacherForm;
