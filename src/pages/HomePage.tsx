import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  IonItem,
  IonList,
  IonFabButton,
  IonIcon,
  IonFab,
  IonLabel,
  IonThumbnail,
  IonImg,
} from '@ionic/react';
import {add as addIcon} from 'ionicons/icons'
import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth';
import { formatDate } from '../date';
import { firestore } from '../firebase';
import { Entry, toEntry } from '../models';


const App: React.FC = () => {
  const{userId}=useAuth();
  const [entries,setEntries]=useState<Entry[]>([]);
  useEffect(() => {
    const entriesRef=firestore.collection('users').doc(userId).collection('entries');
    return entriesRef.orderBy('date','desc').limit(7)
    .onSnapshot(snapshot =>{
      const entries=snapshot.docs.map(doc=>toEntry(doc));
      setEntries(entries);
    });
  }, [userId])
  
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
              routerLink={`/my/entries/view/${entry.id}`}>
                <IonThumbnail slot='end'>
                  <IonImg src={entry.pictureUrl}></IonImg>
                </IonThumbnail>
                <IonLabel>
                <h2>{formatDate(entry.date)}</h2>
                <h3>{entry.title}</h3>
                </IonLabel>
              
            </IonItem>
          )}
        </IonList>
        <IonFab vertical="bottom" horizontal="end">
        <IonFabButton routerLink='/my/entries/add'>
          <IonIcon icon={addIcon}/>
        </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default App;
