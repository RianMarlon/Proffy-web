import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import { TeachersProvider } from './contexts/TeachersContext';
import Login from './pages/Login';
import Cadastre from './pages/Cadastre';
import ForgotPassword from './pages/ForgotPassword';

function Routes() {
  return (
    <BrowserRouter>
      <TeachersProvider>
        <Route path="/" exact component={Login} />
        <Route path="/cadastre" component={Cadastre} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/home" component={Landing} />
        <Route path="/study" component={TeacherList} />
        <Route path="/give-classes" component={TeacherForm} />
      </TeachersProvider>
    </BrowserRouter>
  );
}

export default Routes;
