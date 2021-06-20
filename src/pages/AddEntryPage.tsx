import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  isPlatform,
} from '@ionic/react';
import { CameraResultType, Plugins } from '@capacitor/core';
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../auth';
import { firestore, storage } from '../firebase';
const { Camera } = Plugins;

async function savePicture(blobUrl, userId) {
  const pictureRef = storage.ref(`/users/${userId}/pictures/${Date.now()}`);
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const snapshot = await pictureRef.put(blob);
  const url = await snapshot.ref.getDownloadURL();
  console.log('saved picture:', url);
  return url;
}


const AddEntryPage: React.FC = () => {
  const { userId } = useAuth();
  const history = useHistory();
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pictureUrl, setPictureUrl] = useState('/assets/placeholder.png');
  const fileInputRef = useRef<HTMLInputElement>();
  const[loading,setLoading]=useState(false);

  useEffect(() => () => {
    if (pictureUrl.startsWith('blob:')) {
      URL.revokeObjectURL(pictureUrl);
    }
    
    setLoading(false);
  }, [pictureUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const pictureUrl = URL.createObjectURL(file);
      setPictureUrl(pictureUrl);
    }
  };
  const handlePictureClick= async()=>{
    
    if(isPlatform('capacitor')){
      try{
        const photo=await Camera.getPhoto({
          resultType:CameraResultType.Uri,
        })
        setPictureUrl(photo.webPath);
      }
      catch(error){
        console.log(error);
      }
    }
    else{
      fileInputRef.current.click();
    }
    
  }
  const handleSave=async ()=>{
    setLoading(true);
    const entriesRef=firestore.collection('users').doc(userId).collection('entries');
    const entryData={date,title,pictureUrl,description};
    if (!pictureUrl.startsWith('/assests')) {
      entryData.pictureUrl = await savePicture(pictureUrl, userId);
    }
    const entryRef=await entriesRef.add(entryData);
    console.log('entryRef',entryRef);
    history.goBack();
  }
  if(loading){
    return <IonLoading isOpen/>
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Add Entry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Date</IonLabel>
          <IonDatetime value={date}
            onIonChange={(event) => setDate(event.detail.value)}
          />
        </IonItem>
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Title</IonLabel>
            <IonInput value={title}
              onIonChange={(event) => setTitle(event.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Pictures</IonLabel>
            <br/>
              <input hidden type='file' accept="image/*" ref={fileInputRef}
              onChange={handleFileChange}/>
              <img style={{cursor:'pointer'}} src={pictureUrl} alt=""onClick={handlePictureClick}></img>
          </IonItem>
          
          <IonItem>
            <IonLabel position="stacked">Description</IonLabel>
            <IonTextarea value={description}
              onIonChange={(event) => setDescription(event.detail.value)}
            />
          </IonItem>
        </IonList>
        <IonButton expand="block" onClick={handleSave}>Save</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AddEntryPage;
