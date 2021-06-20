import {
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
} from '@ionic/react';
import {home as homeIcon,settings as settingsIcon} from 'ionicons/icons'
import React from 'react';
import { Redirect,Route } from 'react-router';
import HomePage from './pages/HomePage'
import  SettingsPage from './pages/SettingsPage'
import  EntryPage from './pages/EntryPage'
import { useAuth } from './auth';
import AddEntryPage from './pages/AddEntryPage';


const App: React.FC = () => {
  const {loggedIn}=useAuth();
    if(!loggedIn){
      return <Redirect to='/login'/>
    }
    return (
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/my/entries">
              <HomePage/>
          </Route>
          <Route exact path="/my/entries/add">
              <AddEntryPage/>
          </Route>
          <Route exact path="/my/entries/view/:id">
              <EntryPage/>
          </Route>
          <Route exact path="/my/settings">
            <SettingsPage/>
          </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/my/entries">
          <IonIcon icon={homeIcon}></IonIcon>
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="settings" href="/my/settings">
          <IonIcon icon={settingsIcon}></IonIcon>
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
      
  );
};

export default App;
