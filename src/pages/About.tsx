import { ReactElement, useEffect, useState } from "react";
import './About.css';
import { IonButton, IonIcon, IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonGrid, IonRow } from '@ionic/react';
import { heart } from 'ionicons/icons';
import { useLogger } from '../hooks/useLogger';

// fetching version from package.json
const getVersionFromPackageJson = async () => {
    const packageJson = await import('../../package.json');
    return {
      react: packageJson.dependencies.react,
      reactDom: packageJson.dependencies['react-dom'],
      reactRouterDom: packageJson.dependencies['react-router-dom']
    };
  };

export const About = (): ReactElement => {

    const [showModal, setShowModal] = useState(false); // Modal state
    const [clickCount, setClickCount] = useState(0); // Count for tracking clicks
    const { logs, logInfo } = useLogger(); // Get logs and logging function
    const [versions, setVersions] = useState<{ react: string; reactDom: string; reactRouterDom: string } | null>(null); // Version state

    // fetch versions from package.json
    useEffect(() => {
        const fetchVersions = async () => {
          const versionsData = await getVersionFromPackageJson();
          setVersions(versionsData);
        };
  
        fetchVersions();
    }, []);

    // for debugginh routing
    useEffect(() => {
        console.log("About component has been mounted.");
        return () => {
            console.log("About component has been unmounted.");
        };
    }, []);

    // Handle button click to log and show modal
    const handleLogAndShowModal = () => {
        logInfo('User clicked the "Check the loggings" button.');
        setClickCount(prevCount => prevCount + 1); // Increment click count
        setShowModal(true); // Show modal
    };

    // Diagnostic for modal closing
    const handleCloseModal = () => {
        console.log('Close button clicked');
        setShowModal(false); // Update modal state
        console.log('Modal state after close:', showModal);
    };
    

    return (
        <div className="about-container">
            <h1>About</h1>
            <h2>Version from package.json</h2>
            <div className="version-area">
                {versions ? (
                    <>
                        <p>react: <b>{versions.react}</b></p>
                        <p>react-dom: <b>{versions.reactDom}</b></p>
                        <p>react-router-dom: <b>{versions.reactRouterDom}</b></p>
                    </>
                ) : (
                    <p>Loading versions...</p>
                )}
            </div>

            <div className="developer-area">
                <h2>Developer</h2>
                <div className="aboutMe">
                    <img src="/profilePic.jpg" alt="Profile picture of the developer" />
                    <p>Hi! My name is Sara Konno, I developed this page for 
                        Cross Platform development course in the 5th 
                        semester at FH Technikum!</p>
                </div>
                <IonButton color="medium" onClick={handleLogAndShowModal}>
                    <IonIcon slot="start" icon={heart}></IonIcon>
                    Check the loggings
                </IonButton>

                <IonModal isOpen={showModal}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Log Messages</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <IonGrid>
                            <IonRow>
                                <p style={{ padding: '16px', textAlign: 'center' }}>
                                    You accessed this logging modal for {clickCount} time(s).
                                </p>
                            </IonRow>
                            <IonRow>
                                <IonList>
                                    {logs.map((log, index) => (
                                        <IonItem key={index}>{log}</IonItem>
                                    ))}
                                </IonList>
                            </IonRow>
                            <IonRow>
                                <IonButton expand="block" onClick={handleCloseModal} color="light">
                                    Close
                                </IonButton>
                            </IonRow>
                        </IonGrid>
                    </IonContent>
                </IonModal>
            </div>
            
        </div>
    );
}