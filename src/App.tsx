import {
  IonApp,
  IonLoading,
  IonRouterOutlet,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import AppTabs from './AppTabs';
import { AuthContext, useAuthInit } from './auth';
import  LoginPage from './pages/Login'
import  PageNotFound from './pages/PageNotFound'
import RegisterPage from './pages/RegisterPage';

const App: React.FC = () => {
  const {loading,auth}=useAuthInit();

  if(loading){
    return <IonLoading isOpen/>
  }
  return (
    <IonApp>
      <AuthContext.Provider value={auth}>
      <IonReactRouter>
        <IonRouterOutlet>
          <Switch>
          <Route exact path="/login">
              <LoginPage />
          </Route>
          <Route exact path="/register">
              <RegisterPage />
          </Route>
          <Route path="/my">
            <AppTabs />
          </Route>
          <Redirect exact path="/" to="/my/entries"></Redirect>
          <Route>
            <PageNotFound/>
          </Route>
          </Switch>
      </IonRouterOutlet>
      </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
