import './App.css';
import { useState, useEffect } from 'react';
import { IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton } from '@ionic/react';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Map } from './pages/Map';
import { Profile } from './pages/Profile';
import { SplashScreen } from './components/SplashScreen';
import { setupIonicReact } from '@ionic/react'; // Required to initialize Ionic
import '@ionic/react/css/core.css'; // Core Ionic CSS
import 'leaflet/dist/leaflet.css';

setupIonicReact();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Set to false after 2 seconds (simulating data loading)
    }, 2000); // You can adjust the duration based on real data loading time

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, []);

  // Check if running inside Electron
  const isElectron = !!(window && window.process && window.process.type);

  if (isLoading) {
    // Show the SplashScreen while loading
    return <SplashScreen />;
  }

  const Router = isElectron ? HashRouter : BrowserRouter;
  
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
