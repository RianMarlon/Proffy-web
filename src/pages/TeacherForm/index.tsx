import React from 'react';

import PageHeader from '../../components/PageHeader';

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
          <div className="input-block">
            <label htmlFor="name">Nome completo</label>
            <input type="name" id="name" />
          </div>

          <div className="input-block">
            <label htmlFor="avatar">Avatar</label>
            <input type="text" id="avatar" />
          </div>

          <div className="input-block">
            <label htmlFor="whatsapp">WhatsApp</label>
            <input type="text" id="whatsapp" />
          </div>
        </fieldset>
      </main>
    </div>
  );
}

export default TeacherForm;
