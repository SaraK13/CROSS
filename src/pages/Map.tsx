import { ReactElement, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import './Map.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});
  
L.Marker.prototype.options.icon = DefaultIcon;

// Create a hook to handle map centering
function CenterMapButton({ position }: { position: L.LatLngExpression }) {
    const map = useMap();
  
    const handleClick = () => {
      map.setView(position, 11);
    };
  
    return (
      <button className="center-map-button" onClick={handleClick}>
        Jump to Device Location
      </button>
    );
}

// Main Map Component
export const Map = (): ReactElement => {
    const [deviceLocation, setDeviceLocation] = useState<L.LatLngExpression | null>(null);
    const [deviceCoordinates, setDeviceCoordinates] = useState<{ latitude: number, longitude: number } | null>(null); // To store latitude and longitude as a string
    const [issCoordinates, setIssCoordinates] = useState<{ latitude: number, longitude: number } | null>(null); // Store ISS coordinates
    const [issLocation, setIssLocation] = useState<L.LatLngExpression | null>(null);
    const [error, setError] = useState<string | null>(null);
  
    // Fetch device location using Geolocation API
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setDeviceLocation([latitude, longitude]);
                setDeviceCoordinates({ latitude, longitude }); // Store raw coordinates
            },
            (err) => setError('Could not retrieve device location'),{ 
                enableHighAccuracy: true 
            }
        );
    }, []);

    // Fetch ISS location from the Open Notify API
    useEffect(() => {
        const fetchIssLocation = async () => {
        try {
            const response = await fetch('http://api.open-notify.org/iss-now.json');
            const data = await response.json();
            const { latitude, longitude } = data.iss_position;
            setIssLocation([latitude, longitude]);
            setIssCoordinates({ latitude, longitude });
        } catch (err) {
            setError('Failed to retrieve ISS location');
        }
        };

        fetchIssLocation();
    }, []);

    return (
        <div className="map-container">
            <h1>Map</h1>

            {error && <p>Error: {error}</p>}

            {/* Render the map if the device location is available */}
            {deviceLocation && (
                <MapContainer
                    center={deviceLocation}
                    zoom={11}
                    scrollWheelZoom={true}
                    style={{ height: '400px', width: '60%' }}
                >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* Marker for the device location */}
                <Marker position={deviceLocation}>
                    <div>Device Location</div>
                </Marker>

                {/* Marker for the ISS location */}
                {issLocation && (
                    <Marker position={issLocation}>
                    <div>ISS Location</div>
                    </Marker>
                )}

                {/* Button to center the map on the device's location */}
                <CenterMapButton position={deviceLocation} />
                </MapContainer>
            )}

            {deviceCoordinates && (
                <p>
                    My current location is: Latitude {deviceCoordinates.latitude}, Longitude {deviceCoordinates.longitude}
                </p>
            )}
            {issCoordinates && (
                <p>
                    ISS current location is: Latitude {issCoordinates.latitude}, Longitude {issCoordinates.longitude}
                </p>
            )}
        </div>
    );
}