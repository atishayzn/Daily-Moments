import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  IonItem,
  IonList,
} from '@ionic/react';
import React from 'react';
import {entries} from '../data'

const App: React.FC = () => {
  console.log(entries)
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {entries.map((entry)=>
            <IonItem button key={entry.id}
            routerLink={`/my/entries/${entry.id}`}>
              {entry.title}</IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default App;
