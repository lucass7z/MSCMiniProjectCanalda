import { useEffect, useRef } from 'react';
import {MapContainer, Marker, Polyline, Popup, TileLayer, useMap} from 'react-leaflet';
import L from 'leaflet';

/**
 * Component to adjust bounds based on user locations.
 * @param {{lat: number, lng: number}[]} locations
 */
function MapBounds({ locations }) {
    const map = useMap();

    useEffect(() => {
        if (locations.length > 0) {
            const bounds = L.latLngBounds(locations.map(loc => [loc.lat, loc.lng]));
            map.fitBounds(bounds, { padding: [50, 50] });  // Adjust padding as needed
        }
    }, [locations, map]);

    return null;
}

// Crée une icône personnalisée rouge
const redIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

/**
 * MapView component
 * @param {{id: number, name: string, location: {id: number, name: string, lat: number, lng:number} | null}[]} users
 * @param {{id: number, name: string, lat: number, lng:number}} rdv
 * @param rest
 */
export function MapView({ users, rdv, ...rest }) {
    // Filtrer les utilisateurs avec des coordonnées de location valides
    const validLocations = users
        .filter(user => user && user.location)
        .map(user => user.location);

    // Calculer le centre initial en cas de chargement sans utilisateurs
    const initialCenter = validLocations.length > 0
        ? [validLocations[0].lat, validLocations[0].lng]
        : [47.495446, 6.8045663];


    return (
        <div {...rest}>
            <MapContainer
                center={initialCenter}
                style={{ height: '100%', width: '100%' }}
                zoom={13}
                scrollWheelZoom={true}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {validLocations.map((loc, index) => (
                    <>
                    <Marker key={index} position={[loc.lat, loc.lng]}>
                        <Popup>{users.find(user => user && user.location === loc)?.name || "Unknown"} at {users.find(user => user && user.location === loc)?.location.name || "Unknown"}</Popup>
                    </Marker>
                        {rdv &&  <Polyline positions={[[loc.lat, loc.lng], [rdv.lat, rdv.lng]]} color="blue" weight={3} dashArray="5,10"><Popup>Walk 5 min</Popup></Polyline>}
                    </>
            ))}

                {rdv && (
                    <>
                        <Marker position={[rdv.lat, rdv.lng]} icon={redIcon}>
                            <Popup>Rendez Vous at {rdv.name}</Popup>
                        </Marker>
                    </>
                )}

                <MapBounds locations={validLocations} />
            </MapContainer>
        </div>
    );
}