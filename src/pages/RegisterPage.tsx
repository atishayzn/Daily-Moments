import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../auth';
import { auth } from '../firebase';

const App: React.FC= () => {
  const {loggedIn}=useAuth();
  const[email,setEmail]= useState("");
  const[password,setPassword]=useState("");
  const[status,setStatus]=useState({loading:false,error:false});
  const handleRegister=async ()=>{
    try{
      setStatus({loading:true,error:false});
      const credential=await auth.createUserWithEmailAndPassword(email,password);
      setStatus({loading:false,error:false});
      console.log(credential);
    }
    catch(error){
      setStatus({loading:false,error:true});
      console.log("error",error);
    } 
  }
  
  if(loggedIn){
    return <Redirect to="/my/entries"></Redirect>
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem >
            <IonLabel position ='stacked'>Email</IonLabel>
            <IonInput type='email' value={email} onIonChange={event=>setEmail(event.detail.value)}></IonInput>
          </IonItem>
          <IonItem >
            <IonLabel position ='stacked' >Password</IonLabel>
            <IonInput type='password' value={password} onIonChange={event=>setPassword(event.detail.value)}></IonInput>
          </IonItem>
        </IonList>
        {status.error && <IonText color='danger'>Registrattion Failed</IonText>}

        <IonButton expand="block" onClick={handleRegister}>Create Account</IonButton>
        <IonButton expand="block" fill="clear" routerLink="/login">
            ALREADY HAVE AN ACCOUNT?
        </IonButton>
        <IonLoading isOpen={status.loading}/>
      </IonContent>
    </IonPage>
  );
};

export default App;
