import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import { TeachersProvider } from './contexts/TeachersContext';
import Login from './pages/Login';

function Routes() {
    return (
        <BrowserRouter>
            <TeachersProvider>
                <Route path="/" exact component={Login} />
                <Route path="/home" component={Landing} />
                <Route path="/study" component={TeacherList} />
                <Route path="/give-classes" component={TeacherForm} />
            </TeachersProvider>
        </BrowserRouter>
    );
}

export default Routes;
