import React, { useContext } from 'react';
import { Route, Redirect, Switch, BrowserRouter } from 'react-router-dom';

import { TeachersProvider } from './contexts/TeachersContext';
import AuthContext from './contexts/AuthContext';

import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import Loading from './pages/Loading';

const PrivateRoute = ({component, ...rest}: any) => {
  const { isValidToken, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }
  
  const routeComponent = (props: any) => {
    return isValidToken
      ? React.createElement(component, props)
      : <Redirect to={{pathname: '/', state: { from: props.location }}} />
  }
  
  return <Route {...rest} render={routeComponent} />;
};

const PublicRoute = ({component, ...rest}: any) => {
  const { isValidToken, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  const routeComponent = (props: any) => (
    !isValidToken
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
