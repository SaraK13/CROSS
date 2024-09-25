import './App.css';
import { IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton } from '@ionic/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Map } from './pages/Map';
import { Profile } from './pages/Profile';
import { setupIonicReact } from '@ionic/react'; // Required to initialize Ionic
import '@ionic/react/css/core.css'; // Core Ionic CSS

setupIonicReact();

function App() {
  return (
    <IonApp>
      <Router>
        {/* Navigation Bar */}
        <IonHeader>
          <IonToolbar>
            <IonTitle>My App</IonTitle>
            <IonButtons slot="end">
              <IonButton routerLink="/">Home</IonButton>
              <IonButton routerLink="/about">About</IonButton>
              <IonButton routerLink="/map">Map</IonButton>
              <IonButton routerLink="/profile">Profile</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        {/* Main Content */}
        <IonContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/map" element={<Map />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </IonContent>
      </Router>
    </IonApp>
  );
}

export default App;
