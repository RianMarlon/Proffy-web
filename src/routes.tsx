import React from 'react';
import { BrowserRouter, Route, Redirect, useHistory, Switch } from 'react-router-dom';

import { TeachersProvider } from './contexts/TeachersContext';
import { hasToken, hasTokenValid } from './services/auth';

import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import Profile from './pages/Profile';

const PrivateRoute = ({component, ...rest}: any) => {
  const history = useHistory();

  hasTokenValid().then((response) => {
    if (!response) history.push("/");
  });
  
  const routeComponent = (props: any) => {
    return hasToken()
      ? React.createElement(component, props)
      : <Redirect to={{pathname: '/', state: { from: props.location }}} />
  }
  
  return <Route {...rest} render={routeComponent} />;
};

const PublicRoute = ({component, ...rest}: any) => {
  const routeComponent = (props: any) => (
    !hasToken()
      ? React.createElement(component, props)
      : <Redirect to={{pathname: '/home', state: { from: props.location }}} />
  );
  
  return <Route {...rest} render={routeComponent} />;
};

function Routes() {
  return (
    <TeachersProvider>
      <BrowserRouter>
          <Switch>
            <PublicRoute path="/" exact component={Login} />
            <PublicRoute path="/register" component={Register} />
            <PublicRoute path="/forgot-password" component={ForgotPassword} />
            <PublicRoute path="/change-password" component={ChangePassword} />
            <PrivateRoute path="/my-profile" component={Profile} />
            <PrivateRoute path="/home" component={Landing} />
            <PrivateRoute path="/study" component={TeacherList} />
            <PrivateRoute path="/give-classes" component={TeacherForm} />
          </Switch>
      </BrowserRouter>
    </TeachersProvider>
  );
}

export default Routes;
